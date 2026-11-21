"use server";

import { redirect } from "next/navigation";
import { findDemoUserByLogin, rolInfo } from "@/lib/auth/demo-users";
import { createSession, deleteSession } from "@/lib/auth/session";

export type LoginState = { error?: string; email?: string } | undefined;

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Escribe tu correo y tu contraseña.", email };
  }

  const user = findDemoUserByLogin(email);
  if (!user || user.password !== password) {
    return { error: "El correo o la contraseña no son correctos.", email };
  }

  await createSession(user.id);
  redirect(rolInfo[user.rol].home);
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
