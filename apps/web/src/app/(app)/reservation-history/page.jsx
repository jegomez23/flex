import { ReservationList } from "@/components/experience/reservation-list";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { reservations } from "@/data/mock-data";

export default function ReservationHistoryPage() {
  const historyItems = [...reservations, ...reservations].map((item, index) => ({
    ...item,
    code: `${item.code}-${index + 1}`,
  }));

  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Historial"
        title="Tu recorrido en FLEX"
        description="Consulta reservas pasadas y proximas con una vista limpia y facil de revisar."
      />
      <ReservationList items={historyItems} />
    </PageReveal>
  );
}
