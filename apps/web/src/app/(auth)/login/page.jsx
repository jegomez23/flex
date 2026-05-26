import Link from "next/link";
import { AuthCard } from "@/components/experience/auth-card";
import { InputField } from "@/components/experience/input-field";
import { NeonButton } from "@/components/ui/neon-button";

export default function LoginPage() {
  return (
    <AuthCard
      eyebrow="Acceso"
      title="Bienvenido de nuevo"
      description="Entra a tus reservas, pedidos y accesos desde una interfaz simple y clara."
      footer={
        <div className="flex items-center justify-between text-xs text-white/45">
          <Link href="/recuperar-acceso">Recuperar acceso</Link>
          <Link href="/registro">Crear cuenta</Link>
        </div>
      }
    >
      <form className="space-y-4">
        <InputField label="Correo" placeholder="alex@flex.club" type="email" />
        <InputField label="Clave" placeholder="Tu clave" type="password" />
        <NeonButton className="w-full">Entrar</NeonButton>
      </form>
    </AuthCard>
  );
}
