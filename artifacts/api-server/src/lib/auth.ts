import crypto from "node:crypto";
import { db, sessionsTable, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import type { Request, Response } from "express";
import * as oidc from "openid-client";

export const ISSUER_URL = process.env.ISSUER_URL ?? "https://replit.com/oidc";
export const SESSION_COOKIE = "sid";
export const SESSION_TTL = 7 * 24 * 60 * 60 * 1000;
export type AuthUser = Pick<typeof usersTable.$inferSelect, "id" | "email" | "firstName" | "lastName" | "profileImageUrl">;
export interface SessionData { user: AuthUser; access_token: string; refresh_token?: string; expires_at?: number; }
let oidcConfig: oidc.Configuration | null = null;

export async function getOidcConfig() {
  if (!oidcConfig) oidcConfig = await oidc.discovery(new URL(ISSUER_URL), process.env.REPL_ID!);
  return oidcConfig;
}
export async function createSession(data: SessionData) {
  const sid = crypto.randomBytes(32).toString("hex");
  await db.insert(sessionsTable).values({ sid, sess: data as unknown as Record<string, unknown>, expire: new Date(Date.now() + SESSION_TTL) });
  return sid;
}
export async function getSession(sid: string): Promise<SessionData | null> {
  const [row] = await db.select().from(sessionsTable).where(eq(sessionsTable.sid, sid));
  if (!row || row.expire < new Date()) { if (row) await db.delete(sessionsTable).where(eq(sessionsTable.sid, sid)); return null; }
  return row.sess as unknown as SessionData;
}
export async function updateSession(sid: string, data: SessionData) {
  await db.update(sessionsTable).set({ sess: data as unknown as Record<string, unknown>, expire: new Date(Date.now() + SESSION_TTL) }).where(eq(sessionsTable.sid, sid));
}
export async function deleteSession(sid: string) { await db.delete(sessionsTable).where(eq(sessionsTable.sid, sid)); }
export async function clearSession(res: Response, sid?: string) { if (sid) await deleteSession(sid); res.clearCookie(SESSION_COOKIE, { path: "/" }); }
export function getSessionId(req: Request) { const auth = req.headers.authorization; return auth?.startsWith("Bearer ") ? auth.slice(7) : req.cookies?.[SESSION_COOKIE]; }
export async function upsertUser(claims: Record<string, unknown>) {
  const userData = { id: claims.sub as string, email: (claims.email as string) || null, firstName: (claims.first_name as string) || null, lastName: (claims.last_name as string) || null, profileImageUrl: (claims.profile_image_url || claims.picture) as string | null };
  const [user] = await db.insert(usersTable).values(userData).onConflictDoUpdate({ target: usersTable.id, set: { ...userData, updatedAt: new Date() } }).returning();
  return user;
}