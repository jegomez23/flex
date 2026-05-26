import { VipRoomCard } from "@/components/experience/vip-room-card";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { vipRooms } from "@/data/mock-data";

export default function VipRoomsPage() {
  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Salas VIP"
        title="Tres ambientes, una misma elegancia"
        description="Cada sala tiene una personalidad clara para elegir sin saturacion ni ruido visual."
      />

      <div className="grid gap-4 xl:grid-cols-3">
        {vipRooms.map((room) => (
          <VipRoomCard key={room.slug} room={room} />
        ))}
      </div>
    </PageReveal>
  );
}
