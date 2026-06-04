"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { InputField } from "@/components/experience/input-field";
import { StatusPill } from "@/components/ui/status-pill";

export function PorteroQrForm() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState(null);
  const [pending, setPending] = useState(false);
  const [updating, setUpdating] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const value = token.trim();
    if (!value) {
      setResult({ ok: false, message: "Escribe un token valido." });
      return;
    }

    setPending(true);
    setResult(null);

    const supabase = createSupabaseBrowserClient();
    const { data, error } = await supabase
      .from("reservas")
      .select("id, estado, inicio, fin, total, qr_token, sala_id, cliente_id")
      .eq("qr_token", value)
      .maybeSingle();

    if (error) {
      setResult({ ok: false, message: error.message });
      setPending(false);
      return;
    }

    if (!data) {
      setResult({ ok: false, message: "No encontramos una reserva con ese token." });
      setPending(false);
      return;
    }

    setResult({
      ok: true,
      message:
        data.estado === "pagada"
          ? "Reserva lista para validar."
          : `La reserva ya está en estado ${data.estado}.`,
      data,
    });
    setPending(false);
  }

  async function confirmEntry() {
    if (!result?.data?.id) {
      return;
    }

    setUpdating(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase
      .from("reservas")
      .update({ estado: "completada" })
      .eq("id", result.data.id)
      .eq("estado", "pagada");

    if (error) {
      setResult({ ok: false, message: error.message });
      setUpdating(false);
      return;
    }

    setResult({
      ok: true,
      message: "Entrada confirmada. La reserva quedo completada.",
      data: { ...result.data, estado: "completada" },
    });
    setUpdating(false);
  }

  return (
    <GlassCard className="space-y-5 p-6">
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.32em] text-white/36">
          Validacion QR
        </p>
        <h2 className="text-2xl font-medium text-white">Escaneo manual de acceso</h2>
        <p className="text-sm leading-6 text-white/58">
          Si el lector falla, escribe el qr_token de la reserva y valida la entrada en un solo paso.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Token"
          placeholder="Ingresa el qr_token"
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />

        <NeonButton className="w-full" type="submit" disabled={pending}>
          {pending ? "Buscando..." : "Buscar reserva"}
        </NeonButton>
      </form>

      {result ? (
        <div
          className={`space-y-4 rounded-2xl border px-4 py-4 text-sm ${
            result.ok
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-100"
              : "border-rose-500/20 bg-rose-500/10 text-rose-100"
          }`}
        >
          <p>{result.message}</p>

          {result.ok && result.data ? (
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white/78">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/40">
                    Reserva encontrada
                  </p>
                  <p className="mt-2 text-base font-medium text-white">ID #{result.data.id}</p>
                </div>
                <StatusPill
                  label={result.data.estado}
                  tone={result.data.estado === "completada" ? "success" : result.data.estado === "pagada" ? "cyan" : "gold"}
                />
              </div>
              <p>Estado actual: {result.data.estado}</p>
              <p>Total: {result.data.total ?? "—"}</p>
              <p>Inicio: {result.data.inicio ?? "—"}</p>
              <p>Fin: {result.data.fin ?? "—"}</p>

              {result.data.estado === "pagada" ? (
                <NeonButton className="w-full" type="button" onClick={confirmEntry} disabled={updating}>
                  {updating ? "Confirmando..." : "Confirmar entrada"}
                </NeonButton>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </GlassCard>
  );
}
