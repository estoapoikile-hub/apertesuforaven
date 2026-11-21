import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Rol } from "@/lib/types";
import { findDemoUserById, rolInfo, type DemoUser } from "./demo-users";

export const SESSION_COOKIE = "apf_session";
const MAX_AGE = 60 * 60 * 8; // 8 horas

// En producción, definir SESSION_SECRET en las variables de entorno.
const secret =
  process.env.SESSION_SECRET ?? "apertesuforaven-demo-secret-cambiar-en-produccion";

type Payload = { uid: string; exp: number };

function sign(data: string) {
  return createHmac("sha256", secret).update(data).digest("base64url");
}

function encode(payload: Payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data)}`;
}

function decode(token: string | undefined): Payload | null {
  if (!token) return null;
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;
  const expected = Buffer.from(sign(data));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return null;
  }
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString()) as Payload;
    if (payload.exp < Date.now() / 1000) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(uid: string) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  (await cookies()).set(SESSION_COOKIE, encode({ uid, exp }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<DemoUser | null> {
  const payload = decode((await cookies()).get(SESSION_COOKIE)?.value);
  if (!payload) return null;
  return findDemoUserById(payload.uid) ?? null;
}

/** Exige sesión y un rol concreto; si no, redirige. */
export async function requireRole(rol: Rol): Promise<DemoUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.rol !== rol) redirect(rolInfo[user.rol].home);
  return user;
}
