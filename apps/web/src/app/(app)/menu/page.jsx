import { redirect } from "next/navigation";
import { PageReveal } from "@/components/ui/page-reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCatalog } from "@/components/experience/product-catalog";
import { getSessionContext } from "@/lib/supabase/queries";
import { normalizeProductRow } from "@/lib/products";

export default async function MenuPage() {
  const { supabase, user } = await getSessionContext();

  if (!user) {
    redirect("/acceso");
  }

  const { data: products } = await supabase
    .from("productos")
    .select("id, nombre, descripcion, precio, categoria, imagen_url, disponible, creado_en")
    .eq("disponible", true)
    .order("categoria", { ascending: true })
    .order("precio", { ascending: true });

  const normalizedProducts = (products ?? []).map(normalizeProductRow);

  return (
    <PageReveal className="space-y-10">
      <SectionHeading
        eyebrow="Pedidos"
        title="Pide antes o durante la noche"
        description="Catálogo premium alimentado por public.productos y Supabase Storage."
      />

      <ProductCatalog products={normalizedProducts} />
    </PageReveal>
  );
}
