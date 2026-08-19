import { asc, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, quizScores, users } from "../drizzle/schema";
import { buildQuizScoreUpsert, type QuizScoreInput } from "./quizScore";
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

/** Salva ou atualiza a melhor tentativa do navegador participante. */
export async function saveQuizScore(score: QuizScoreInput) {
  const db = await getDb();
  if (!db) {
    return false;
  }

  const now = new Date();
  const scoreUpsert = buildQuizScoreUpsert(score, now);
  await db
    .insert(quizScores)
    .values(scoreUpsert.insert)
    .onDuplicateKeyUpdate({
      set: scoreUpsert.update,
    });

  return true;
}

/** Lista até cinquenta resultados do maior para o menor, com desempate pela primeira conclusão. */
export async function listQuizScores() {
  const db = await getDb();
  if (!db) {
    return [];
  }

  return db
    .select()
    .from(quizScores)
    .orderBy(desc(quizScores.totalScore), asc(quizScores.completedAt), asc(quizScores.participantName))
    .limit(50);
}

/** Remove todos os resultados ao iniciar uma nova rodada da apresentação. */
export async function clearQuizScores() {
  const db = await getDb();
  if (!db) {
    return false;
  }

  await db.delete(quizScores);
  return true;
}
