import { AuthCard } from "@/components/experience/auth-card";
import { RegisterForm } from "@/components/auth/auth-forms";
import { signUpAction } from "../actions";

export default function RegisterPage() {
  return (
    <AuthCard
      eyebrow="Registro"
      title="Crea tu cuenta"
      description="Prepara tu perfil para reservar, pedir y entrar a FLEX con menos pasos."
    >
      <RegisterForm action={signUpAction} />
    </AuthCard>
  );
}
