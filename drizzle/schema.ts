import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Registra a pontuação consolidada de cada participante do Quiz.
 * A chave do participante é criada no navegador e permite atualizar o próprio resultado
 * sem exigir conta ou armazenar dados pessoais além do nome informado.
 */
export const quizScores = mysqlTable("quiz_scores", {
  /** Identificador interno do resultado. */
  id: int("id").autoincrement().primaryKey(),
  /** Nome escolhido pelo participante para aparecer no placar. */
  participantName: varchar("participantName", { length: 60 }).notNull(),
  /** Chave anônima persistida somente no navegador do participante. */
  participantKey: varchar("participantKey", { length: 64 }).notNull().unique(),
  /** Pontuação total de zero a vinte. */
  totalScore: int("totalScore").notNull(),
  /** Pontuação na frente Skill, de zero a cinco. */
  skillScore: int("skillScore").notNull(),
  /** Pontuação na frente MCPs, de zero a cinco. */
  mcpScore: int("mcpScore").notNull(),
  /** Pontuação na frente SubAgentes, de zero a cinco. */
  subagentsScore: int("subagentsScore").notNull(),
  /** Pontuação na frente RAG, de zero a cinco. */
  ragScore: int("ragScore").notNull(),
  /** Momento em que o participante concluiu ou atualizou o Quiz. */
  completedAt: timestamp("completedAt").defaultNow().notNull(),
  /** Momento da criação do registro. */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** Momento da última atualização do registro. */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type QuizScore = typeof quizScores.$inferSelect;
export type InsertQuizScore = typeof quizScores.$inferInsert;
