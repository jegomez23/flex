import { cookies } from "next/headers";
import { createSupabaseServerClient } from "./server";

export async function getSessionContext() {
  const cookieStore = await cookies();
  const supabase = await createSupabaseServerClient(cookieStore);
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims ?? null;
  const userId = claims?.sub ?? null;

  if (!userId) {
    return { supabase, user: null, profile: null };
  }

  const { data: profile } = await supabase
    .from("perfiles")
    .select("id, nombre, rol, avatar_url, creado_en")
    .eq("id", userId)
    .maybeSingle();

  return {
    supabase,
    user: { id: userId, email: claims?.email ?? null },
    profile,
  };
}

export async function requireProfileRole(allowedRoles) {
  const context = await getSessionContext();

  if (!context.user) {
    return { ...context, allowed: false, reason: "no-session" };
  }

  if (!context.profile || !allowedRoles.includes(context.profile.rol)) {
    return { ...context, allowed: false, reason: "forbidden" };
  }

  return { ...context, allowed: true };
}
