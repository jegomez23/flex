import { AdminBoard } from "@/components/experience/admin-board";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";

export default function AdminPage() {
  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Dashboard admin"
        title="Operacion clara para la noche en curso"
        description="Reservas, pedidos y actividad en sala organizados con la misma calma visual del resto de FLEX."
        action={<StatusPill label="Noche en vivo" tone="danger" />}
      />
      <AdminBoard />
    </PageReveal>
  );
}
