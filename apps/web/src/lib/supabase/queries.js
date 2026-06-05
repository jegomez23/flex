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

export async function getClientExperienceData(supabase, userId) {
  const [reservationsResult, ordersResult] = await Promise.all([
    supabase
      .from("reservas")
      .select("id, sala_id, inicio, fin, estado, total, qr_token, creado_en")
      .eq("cliente_id", userId)
      .order("inicio", { ascending: false }),
    supabase
      .from("pedidos")
      .select("id, mesa_id, estado, total, creado_en, actualizado")
      .eq("cliente_id", userId)
      .order("creado_en", { ascending: false }),
  ]);

  const reservations = reservationsResult.data ?? [];
  const orders = ordersResult.data ?? [];
  const roomIds = [...new Set(reservations.map((reservation) => reservation.sala_id).filter(Boolean))];
  const tableIds = [...new Set(orders.map((order) => order.mesa_id).filter(Boolean))];

  const [roomsResult, tablesResult] = await Promise.all([
    roomIds.length
      ? supabase
          .from("salas_vip")
          .select("id, nombre, capacidad, precio_hora, imagen_url, activa")
          .in("id", roomIds)
      : Promise.resolve({ data: [] }),
    tableIds.length
      ? supabase
          .from("mesas")
          .select("id, numero, piso, capacidad, activa")
          .in("id", tableIds)
      : Promise.resolve({ data: [] }),
  ]);

  return {
    reservations,
    orders,
    rooms: roomsResult.data ?? [],
    tables: tablesResult.data ?? [],
    reservationError: reservationsResult.error ?? null,
    orderError: ordersResult.error ?? null,
  };
}
