import { Router, type Request, type Response } from "express";
import crypto from "node:crypto";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  createSession,
  getSessionId,
  clearSession,
  SESSION_COOKIE,
  SESSION_TTL,
  getSession,
} from "../lib/auth";

const router = Router();

function hashPassword(password: string): string {
  return crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
}

function setSessionCookie(res: Response, sid: string) {
  res.cookie(SESSION_COOKIE, sid, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL,
  });
}

function publicUser(user: typeof usersTable.$inferSelect) {
  const { passwordHash: _passwordHash, ...safeUser } = user;
  return safeUser;
}

router.get("/auth/user", async (req, res) => {
  try {
    const sid = getSessionId(req);

    if (!sid) {
      return res.json({ user: null });
    }

    const session = await getSession(sid);

    if (!session) {
      return res.json({ user: null });
    }

    return res.json({ user: session.user });
  } catch (error) {
    console.error("AUTH USER ERROR:", error);
    return res.status(500).json({ user: null });
  }
});

router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      firstName = "",
      lastName = "",
    } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters.",
      });
    }

    const normalized = String(email).trim().toLowerCase();

    const existing = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, normalized))
      .limit(1);

    if (existing.length) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const passwordHash = hashPassword(String(password));

    const [user] = await db
      .insert(usersTable)
      .values({
        id: crypto.randomUUID(),
        email: normalized,
        passwordHash,
        firstName: String(firstName),
        lastName: String(lastName),
        profileImageUrl: null,
      })
      .returning();

    const safeUser = publicUser(user);

    const sid = await createSession({
      user: safeUser,
      access_token: "local",
    });

    setSessionCookie(res, sid);

    return res.status(201).json({
      user: safeUser,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      message: "Registration failed.",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const normalized = String(email).trim().toLowerCase();

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, normalized))
      .limit(1);

    if (!user || !user.passwordHash) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordHash = hashPassword(String(password));

    const valid = crypto.timingSafeEqual(
      Buffer.from(passwordHash),
      Buffer.from(user.passwordHash),
    );

    if (!valid) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const safeUser = publicUser(user);

    const sid = await createSession({
      user: safeUser,
      access_token: "local",
    });

    setSessionCookie(res, sid);

    return res.json({
      user: safeUser,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Login failed.",
    });
  }
});

router.get("/logout", async (req, res) => {
  try {
    await clearSession(res, getSessionId(req));
    return res.json({ ok: true });
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    return res.status(500).json({
      message: "Logout failed.",
    });
  }
});

export default router;
