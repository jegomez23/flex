"use client";

import Link from "next/link";
import { useActionState } from "react";
import { InputField } from "@/components/experience/input-field";
import { NeonButton } from "@/components/ui/neon-button";

function AuthFeedback({ state }) {
  if (!state?.error && !state?.message) {
    return null;
  }

  return (
    <p
      className={`rounded-2xl border px-4 py-3 text-sm ${
        state.error
          ? "border-rose-500/20 bg-rose-500/10 text-rose-100"
          : "border-emerald-500/20 bg-emerald-500/10 text-emerald-100"
      }`}
    >
      {state.error ?? state.message}
    </p>
  );
}

export function LoginForm({ action }) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-4">
      <AuthFeedback state={state} />
      <InputField
        label="Correo"
        placeholder="alex@flex.club"
        type="email"
        name="email"
        autoComplete="email"
        required
      />
      <InputField
        label="Clave"
        placeholder="Tu clave"
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />
      <NeonButton className="w-full" disabled={pending}>
        {pending ? "Entrando..." : "Entrar"}
      </NeonButton>
      <div className="flex items-center justify-between text-xs text-white/45">
        <Link href="/recuperar-acceso">Recuperar acceso</Link>
        <Link href="/registro">Crear cuenta</Link>
      </div>
    </form>
  );
}

export function RegisterForm({ action }) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-4">
      <AuthFeedback state={state} />
      <InputField
        label="Nombre"
        placeholder="Alex Rivera"
        name="name"
        autoComplete="name"
        required
      />
      <InputField
        label="Correo"
        placeholder="alex@flex.club"
        type="email"
        name="email"
        autoComplete="email"
        required
      />
      <InputField
        label="Telefono"
        placeholder="+34 600 123 456"
        name="phone"
        autoComplete="tel"
      />
      <InputField
        label="Clave"
        placeholder="Crea tu clave"
        type="password"
        name="password"
        autoComplete="new-password"
        required
      />
      <NeonButton className="w-full" disabled={pending}>
        {pending ? "Creando..." : "Crear perfil"}
      </NeonButton>
      <div className="text-center text-xs text-white/45">
        Ya tienes cuenta? <Link href="/acceso">Iniciar sesion</Link>
      </div>
    </form>
  );
}
