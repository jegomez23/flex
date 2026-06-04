import { AuthCard } from "@/components/experience/auth-card";
import { LoginForm } from "@/components/auth/auth-forms";
import { signInAction } from "../actions";

export default function LoginPage() {
  return (
    <AuthCard
      eyebrow="Acceso"
      title="Bienvenido de nuevo"
      description="Entra a tus reservas, pedidos y accesos desde una interfaz simple y clara."
    >
      <LoginForm action={signInAction} />
    </AuthCard>
  );
}
