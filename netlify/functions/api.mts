import type { Config, Context } from "@netlify/functions";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { COOKIE_NAME } from "../../shared/const";
import { appRouter } from "../../server/routers";
import type { TrpcContext } from "../../server/_core/context";
import { sdk } from "../../server/_core/sdk";
import type { User } from "../../drizzle/schema";

/**
 * Single Netlify Function that exposes the entire tRPC API at /api/trpc and
 * the OAuth callback at /api/oauth/callback.
 *
 * The original app served tRPC through an Express server that is never started
 * on Netlify (the platform only publishes the static client). This function is
 * what makes every form and tool actually reach the backend. It uses the tRPC
 * fetch adapter (Web Request/Response) and builds an Express-compatible context
 * shim so the existing routers, auth SDK and cookie helpers work unchanged.
 */

type CookieOptions = {
  path?: string;
  domain?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: string;
  maxAge?: number; // milliseconds (express convention); negative clears it
};

function serializeCookie(
  name: string,
  value: string,
  opts: CookieOptions = {},
): string {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  parts.push(`Path=${opts.path ?? "/"}`);
  if (opts.domain) parts.push(`Domain=${opts.domain}`);
  if (typeof opts.maxAge === "number") {
    if (opts.maxAge < 0) {
      parts.push("Max-Age=0");
      parts.push(`Expires=${new Date(0).toUTCString()}`);
    } else {
      parts.push(`Max-Age=${Math.floor(opts.maxAge / 1000)}`);
    }
  }
  if (opts.httpOnly) parts.push("HttpOnly");
  if (opts.secure) parts.push("Secure");
  if (opts.sameSite) {
    const s = opts.sameSite.toLowerCase();
    parts.push(`SameSite=${s.charAt(0).toUpperCase()}${s.slice(1)}`);
  }
  return parts.join("; ");
}

function buildReqShim(req: Request) {
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    headers[key.toLowerCase()] = value;
  });
  const url = new URL(req.url);
  const query: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    query[key] = value;
  });
  const forwardedProto = headers["x-forwarded-proto"];
  const protocol = forwardedProto
    ? forwardedProto.split(",")[0].trim()
    : url.protocol.replace(":", "");
  return {
    headers,
    query,
    protocol,
    hostname: url.hostname,
    url: req.url,
    method: req.method,
  };
}

function buildResShim(resHeaders: Headers) {
  return {
    cookie(name: string, value: string, opts?: CookieOptions) {
      resHeaders.append("set-cookie", serializeCookie(name, value, opts));
    },
    clearCookie(name: string, opts?: CookieOptions) {
      resHeaders.append(
        "set-cookie",
        serializeCookie(name, "", { ...opts, maxAge: -1 }),
      );
    },
    redirect() {
      /* not used inside tRPC procedures */
    },
    status() {
      return this;
    },
    json() {
      /* not used inside tRPC procedures */
    },
  };
}

async function resolveUser(
  reqShim: ReturnType<typeof buildReqShim>,
): Promise<User | null> {
  try {
    // sdk.authenticateRequest only reads req.headers.cookie.
    const user = await sdk.authenticateRequest(reqShim as never);
    return user;
  } catch {
    return null;
  }
}

async function handleOAuthCallback(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state) {
    return Response.json(
      { error: "code and state are required" },
      { status: 400 },
    );
  }
  try {
    const { ONE_YEAR_MS } = await import("../../shared/const");
    const db = await import("../../server/db");
    const tokenResponse = await sdk.exchangeCodeForToken(code, state);
    const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
    if (!userInfo.openId) {
      return Response.json(
        { error: "openId missing from user info" },
        { status: 400 },
      );
    }
    await db.upsertUser({
      openId: userInfo.openId,
      name: userInfo.name || null,
      email: userInfo.email ?? null,
      loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
      lastSignedIn: new Date(),
    });
    const sessionToken = await sdk.createSessionToken(userInfo.openId, {
      name: userInfo.name || "",
      expiresInMs: ONE_YEAR_MS,
    });
    const headers = new Headers({ location: "/" });
    headers.append(
      "set-cookie",
      serializeCookie(COOKIE_NAME, sessionToken, {
        httpOnly: true,
        path: "/",
        sameSite: "none",
        secure: true,
        maxAge: ONE_YEAR_MS,
      }),
    );
    return new Response(null, { status: 302, headers });
  } catch (error) {
    console.error("[OAuth] Callback failed", error);
    return Response.json({ error: "OAuth callback failed" }, { status: 500 });
  }
}

export default async (req: Request, _context: Context): Promise<Response> => {
  const url = new URL(req.url);

  if (url.pathname.startsWith("/api/oauth/callback")) {
    return handleOAuthCallback(req);
  }

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async ({ resHeaders }): Promise<TrpcContext> => {
      const reqShim = buildReqShim(req);
      const user = await resolveUser(reqShim);
      const resShim = buildResShim(resHeaders);
      return {
        req: reqShim as never,
        res: resShim as never,
        user,
      };
    },
    onError({ error, path }) {
      console.error(`[tRPC] Error on "${path ?? "<no-path>"}":`, error.message);
    },
  });
};

export const config: Config = {
  path: ["/api/trpc", "/api/trpc/*", "/api/oauth/callback"],
};

