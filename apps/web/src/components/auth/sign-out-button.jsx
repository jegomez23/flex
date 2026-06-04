import { signOutAction } from "@/app/(auth)/actions";
import { NeonButton } from "@/components/ui/neon-button";

export function SignOutButton({ className }) {
  return (
    <form action={signOutAction}>
      <NeonButton variant="secondary" className={className} type="submit">
        Salir
      </NeonButton>
    </form>
  );
}
