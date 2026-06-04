"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AUTH_ROLE_COOKIE, getRoleRedirectPath } from "@/lib/auth";

async function readProfileRole(supabase, userId) {
  const { data } = await supabase
    .from("perfiles")
    .select("rol")
    .eq("id", userId)
    .maybeSingle();

  return data?.rol ?? "cliente";
}

function getFormValue(formData, key) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function setRoleCookie(role) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_ROLE_COOKIE, role, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function signInAction(_state, formData) {
  const email = getFormValue(formData, "email");
  const password = getFormValue(formData, "password");

  if (!email || !password) {
    return { error: "Completa correo y clave." };
  }

  const cookieStore = await cookies();
  const supabase = await createSupabaseServerClient(cookieStore);

  const { data: signInData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  const user = signInData.user ?? signInData.session?.user ?? null;
  if (!user) {
    return { error: "No pudimos validar tu sesión." };
  }

  const role = await readProfileRole(supabase, user.id);
  await setRoleCookie(role);

  redirect(getRoleRedirectPath(role));
}

export async function signUpAction(_state, formData) {
  const fullName = getFormValue(formData, "name");
  const email = getFormValue(formData, "email");
  const phone = getFormValue(formData, "phone");
  const password = getFormValue(formData, "password");

  if (!fullName || !email || !password) {
    return { error: "Completa nombre, correo y clave." };
  }

  const cookieStore = await cookies();
  const supabase = await createSupabaseServerClient(cookieStore);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user && data.session) {
    const role = await readProfileRole(supabase, data.user.id);
    await setRoleCookie(role);
    redirect(getRoleRedirectPath(role));
  }

  return {
    message:
      "Cuenta creada. Revisa tu correo para confirmar el acceso y luego inicia sesión.",
  };
}

export async function signOutAction() {
  const cookieStore = await cookies();
  const supabase = await createSupabaseServerClient(cookieStore);

  await supabase.auth.signOut();
  cookieStore.delete(AUTH_ROLE_COOKIE);
  redirect("/");
}
