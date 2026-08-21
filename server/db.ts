import { drizzle } from "drizzle-orm/mysql2";
import { and, asc, count, desc, eq } from "drizzle-orm";
import { InsertUser, quizParticipants, quizRounds, quizScores, users } from "../drizzle/schema";
import { getQuizRoundEndAt, QUIZ_DEFAULT_ROUND_DURATION_MINUTES } from "../shared/quizRound";
import { buildQuizParticipantJoin, buildQuizScoreUpsert, type QuizScoreInput } from "./quizScore";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/** Cria uma nova janela de participação usando a duração confirmada pelo apresentador. */
async function createQuizRound(
  startedByParticipantKey: string,
  durationMinutes = QUIZ_DEFAULT_ROUND_DURATION_MINUTES,
  startedAt = new Date(),
) {
  const db = await getDb();
  if (!db) return undefined;

  const endsAt = getQuizRoundEndAt(startedAt, durationMinutes);
  const result = await db.insert(quizRounds).values({
    status: "active",
    startedAt,
    startedByParticipantKey,
    durationMinutes,
    endsAt,
  }).$returningId();

  const created = await db.select().from(quizRounds).where(eq(quizRounds.id, result[0].id)).limit(1);
  return created[0];
}

/**
 * Retorna a rodada mais recente. Quando o prazo se encerra, fecha a rodada
 * automaticamente e preserva o placar para a conferência da equipe.
 */
export async function getCurrentQuizRound() {
  const db = await getDb();
  if (!db) return undefined;

  const rounds = await db.select().from(quizRounds).orderBy(desc(quizRounds.startedAt), desc(quizRounds.id)).limit(1);
  const currentRound = rounds[0];
  if (!currentRound) return undefined;

  if (currentRound.status === "active" && new Date() >= currentRound.endsAt) {
    await db.update(quizRounds).set({ status: "closed", endedAt: currentRound.endsAt }).where(eq(quizRounds.id, currentRound.id));
    return { ...currentRound, status: "closed" as const, endedAt: currentRound.endsAt };
  }

  return currentRound;
}

/** Fecha a rodada atual antes do prazo, somente para o navegador que a abriu. */
export async function finishCurrentQuizRound(startedByParticipantKey: string) {
  const currentRound = await getCurrentQuizRound();
  if (!currentRound) return undefined;
  if (currentRound.status === "closed") return currentRound;
  if (currentRound.startedByParticipantKey !== startedByParticipantKey) return undefined;

  const db = await getDb();
  if (!db) return undefined;

  const endedAt = new Date();
  await db.update(quizRounds).set({ status: "closed", endedAt }).where(eq(quizRounds.id, currentRound.id));
  return { ...currentRound, status: "closed" as const, endedAt };
}

/** Abre uma nova rodada com a duração escolhida quando não há uma rodada ativa. */
export async function startNextQuizRound(
  startedByParticipantKey: string,
  durationMinutes = QUIZ_DEFAULT_ROUND_DURATION_MINUTES,
) {
  const currentRound = await getCurrentQuizRound();
  if (currentRound?.status === "active") return undefined;

  return createQuizRound(startedByParticipantKey, durationMinutes);
}

/** Registra a entrada de uma pessoa na rodada ativa sem exigir conta ou senha. */
export async function registerQuizParticipant(
  roundId: number,
  participantName: string,
  participantKey: string,
  database?: { insert: (...args: any[]) => any; select: (...args: any[]) => any },
) {
  const db = database ?? await getDb();
  if (!db) return false;

  const participantJoin = buildQuizParticipantJoin(roundId, participantName, participantKey, new Date());
  await db
    .insert(quizParticipants)
    .values(participantJoin)
    .onDuplicateKeyUpdate({ set: { participantName } });

  const [participant] = await db
    .select({ participantName: quizParticipants.participantName, joinedAt: quizParticipants.joinedAt })
    .from(quizParticipants)
    .where(and(eq(quizParticipants.roundId, roundId), eq(quizParticipants.participantKey, participantKey)))
    .limit(1);

  return participant ?? false;
}

/** Marca a conclusão depois que a pontuação das vinte perguntas foi persistida. */
export async function markQuizParticipantCompleted(roundId: number, participantKey: string) {
  const db = await getDb();
  if (!db) return false;

  await db
    .update(quizParticipants)
    .set({ completedAt: new Date() })
    .where(and(eq(quizParticipants.roundId, roundId), eq(quizParticipants.participantKey, participantKey)));

  return true;
}

/** Retorna quantas pessoas entraram e quantas concluíram a rodada atual. */
export async function getQuizParticipationSummary(roundId: number) {
  const db = await getDb();
  if (!db) return { started: 0, completed: 0 };

  const result = await db
    .select({ started: count(quizParticipants.id), completed: count(quizParticipants.completedAt) })
    .from(quizParticipants)
    .where(eq(quizParticipants.roundId, roundId));

  return { started: Number(result[0]?.started ?? 0), completed: Number(result[0]?.completed ?? 0) };
}

/** Salva ou atualiza a tentativa do navegador na rodada recebida. */
export async function saveQuizScore(roundId: number, score: QuizScoreInput) {
  const db = await getDb();
  if (!db) {
    return false;
  }

  const now = new Date();
  const scoreUpsert = buildQuizScoreUpsert(score, roundId, now);
  await db
    .insert(quizScores)
    .values(scoreUpsert.insert)
    .onDuplicateKeyUpdate({
      set: scoreUpsert.update,
    });

  return true;
}

/** Lista até cinquenta resultados da rodada atual, com desempate pela primeira conclusão. */
export async function listQuizScores(roundId: number) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return db
    .select()
    .from(quizScores)
    .where(eq(quizScores.roundId, roundId))
    .orderBy(desc(quizScores.totalScore), asc(quizScores.completedAt), asc(quizScores.participantName))
    .limit(50);
}
