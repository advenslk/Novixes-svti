import { Router, type Request, type Response } from "express";
import * as oidc from "openid-client";
import { clearSession, createSession, getOidcConfig, getSessionId, ISSUER_URL, SESSION_COOKIE, SESSION_TTL, upsertUser, type SessionData } from "../lib/auth";

const router = Router();
const OIDC_COOKIE_TTL = 10 * 60 * 1000;
function origin(req: Request) { return `${req.headers["x-forwarded-proto"] || "https"}://${req.headers["x-forwarded-host"] || req.headers.host || "localhost"}`; }
function safeReturnTo(value: unknown) { return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : "/"; }
function cookie(res: Response, name: string, value: string, maxAge = OIDC_COOKIE_TTL) { res.cookie(name, value, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge }); }

router.get("/auth/user", (req, res) => res.json({ user: req.isAuthenticated() ? req.user : null }));
router.get("/login", async (req, res) => {
  const config = await getOidcConfig();
  const state = oidc.randomState(), nonce = oidc.randomNonce(), verifier = oidc.randomPKCECodeVerifier();
  const challenge = await oidc.calculatePKCECodeChallenge(verifier);
  const url = oidc.buildAuthorizationUrl(config, { redirect_uri: `${origin(req)}/api/callback`, scope: "openid email profile offline_access", code_challenge: challenge, code_challenge_method: "S256", prompt: "login consent", state, nonce });
  cookie(res, "code_verifier", verifier); cookie(res, "nonce", nonce); cookie(res, "state", state); cookie(res, "return_to", safeReturnTo(req.query.returnTo));
  return res.redirect(url.href);
});
router.get("/callback", async (req, res) => {
  const config = await getOidcConfig();
  const callbackUrl = `${origin(req)}/api/callback`;
  const currentUrl = new URL(`${callbackUrl}?${new URLSearchParams(req.query as Record<string, string>)}`);
  try {
    const tokens = await oidc.authorizationCodeGrant(config, currentUrl, { pkceCodeVerifier: req.cookies?.code_verifier, expectedNonce: req.cookies?.nonce, expectedState: req.cookies?.state, idTokenExpected: true });
    const claims = tokens.claims();
    if (!claims) return res.redirect("/api/login");
    const user = await upsertUser(claims as unknown as Record<string, unknown>);
    const now = Math.floor(Date.now() / 1000);
    const session: SessionData = { user, access_token: tokens.access_token, refresh_token: tokens.refresh_token, expires_at: tokens.expiresIn() ? now + tokens.expiresIn()! : claims.exp };
    const sid = await createSession(session);
    cookie(res, SESSION_COOKIE, sid, SESSION_TTL);
    return res.redirect(safeReturnTo(req.cookies?.return_to));
  } catch { return res.redirect("/api/login"); }
});
router.get("/logout", async (req, res) => { await clearSession(res, getSessionId(req)); return res.redirect("/"); });
export default router;