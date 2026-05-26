import Link from "next/link";
import { AuthCard } from "@/components/experience/auth-card";
import { InputField } from "@/components/experience/input-field";
import { NeonButton } from "@/components/ui/neon-button";

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      eyebrow="Recuperacion"
      title="Recupera tu acceso"
      description="Te enviaremos un enlace para volver a entrar sin friccion."
      footer={
        <div className="text-center text-xs text-white/45">
          Ya la recuerdas? <Link href="/acceso">Volver al acceso</Link>
        </div>
      }
    >
      <form className="space-y-4">
        <InputField label="Correo" placeholder="alex@flex.club" type="email" />
        <NeonButton className="w-full">Enviar enlace</NeonButton>
      </form>
    </AuthCard>
  );
}
