import { redirect } from "next/navigation";
import { AdminBoard } from "@/components/experience/admin-board";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import { requireProfileRole } from "@/lib/supabase/queries";

export default async function AdminPage() {
  const context = await requireProfileRole(["admin"]);

  if (!context.user) {
    redirect("/acceso");
  }

  if (!context.allowed) {
    redirect("/dashboard/cliente");
  }

  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Dashboard admin"
        title="Operacion clara para la noche en curso"
        description="Reservas, pedidos y actividad en sala organizados con la misma calma visual del resto de FLEX."
        action={
          <div className="flex items-center gap-3">
            <StatusPill label="Noche en vivo" tone="danger" />
            <SignOutButton />
          </div>
        }
      />
      <AdminBoard />
    </PageReveal>
  );
}
