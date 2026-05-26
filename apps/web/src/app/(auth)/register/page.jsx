import Link from "next/link";
import { AuthCard } from "@/components/experience/auth-card";
import { InputField } from "@/components/experience/input-field";
import { NeonButton } from "@/components/ui/neon-button";

export default function RegisterPage() {
  return (
    <AuthCard
      eyebrow="Registro"
      title="Crea tu cuenta"
      description="Prepara tu perfil para reservar, pedir y entrar a FLEX con menos pasos."
      footer={
        <div className="text-center text-xs text-white/45">
          Ya tienes cuenta? <Link href="/acceso">Iniciar sesion</Link>
        </div>
      }
    >
      <form className="space-y-4">
        <InputField label="Nombre" placeholder="Alex Rivera" />
        <InputField label="Correo" placeholder="alex@flex.club" type="email" />
        <InputField label="Telefono" placeholder="+34 600 123 456" />
        <InputField label="Clave" placeholder="Crea tu clave" type="password" />
        <NeonButton className="w-full">Crear perfil</NeonButton>
      </form>
    </AuthCard>
  );
}
