"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Eye, Search, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { formatCurrency, getProductCategoryLabel, getProductStatusLabel, PRODUCT_CATEGORY_LABELS } from "@/lib/products";

const CATEGORY_OPTIONS = Object.entries(PRODUCT_CATEGORY_LABELS);

function DialogShell({ open, title, description, onClose, children }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-[32px] border border-white/10 bg-[#090909] shadow-[0_30px_120px_rgba(0,0,0,0.65)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/8 px-6 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Detalle del producto</p>
            <h3 className="mt-2 text-2xl font-medium text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/58">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:bg-white/[0.08]"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}

function ProductImage({ product }) {
  if (!product.imagen_url) {
    return (
      <div className="grid aspect-[4/3] w-full place-items-center rounded-[24px] border border-white/10 bg-[linear-gradient(160deg,rgba(155,92,255,0.18),rgba(0,212,255,0.08),rgba(255,255,255,0.02))] text-center">
        <div className="space-y-2 px-4">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Imagen no disponible</p>
          <p className="text-sm text-white/70">{getProductCategoryLabel(product.categoria)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] border border-white/10">
      <Image
        src={product.imagen_url}
        alt={product.nombre}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

export function ProductCatalog({ products = [] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.nombre.toLowerCase().includes(query.toLowerCase()) ||
        (product.descripcion ?? "").toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "all" || product.categoria === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, products, query]);

  const featuredProducts = useMemo(
    () => products.filter((product) => product.disponible).slice(0, 3),
    [products],
  );

  const catalogStats = [
    { label: "Productos", value: String(products.length) },
    { label: "Activos", value: String(products.filter((product) => product.disponible).length) },
    { label: "Categorías", value: String(CATEGORY_OPTIONS.length) },
  ];

  return (
    <div className="space-y-8">
      <GlassCard className="space-y-6 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Catálogo premium</p>
            <h2 className="text-2xl font-medium text-white">Explora bebidas, comida y packs VIP</h2>
            <p className="max-w-2xl text-sm leading-6 text-white/58">
              El catálogo se alimenta de public.productos y las imágenes salen del bucket
              público de Supabase Storage.
            </p>
          </div>

          <NeonButton asChild>
            <a href="/reservas">
              <Sparkles className="h-4 w-4" />
              Reservar primero
            </a>
          </NeonButton>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {catalogStats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/36">{stat.label}</p>
              <p className="mt-3 text-2xl font-medium text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.4fr_0.8fr]">
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
            <Search className="h-4 w-4 text-white/48" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar producto, ingrediente o pack"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </label>

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none"
          >
            <option value="all" className="bg-[#0b0b11]">Todas las categorías</option>
            {CATEGORY_OPTIONS.map(([value, label]) => (
              <option key={value} value={value} className="bg-[#0b0b11]">
                {label}
              </option>
            ))}
          </select>
        </div>
      </GlassCard>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Destacados</p>
            <h3 className="mt-2 text-xl font-medium text-white">Productos con imagen y presencia premium</h3>
          </div>
          <p className="text-sm text-white/54">{featuredProducts.length} disponibles</p>
        </div>

        <div className="grid gap-4 xl:grid-cols-3">
          {featuredProducts.map((product) => (
            <GlassCard key={product.id} className="overflow-hidden p-0">
              <ProductImage product={product} />
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
                      {getProductCategoryLabel(product.categoria)}
                    </p>
                    <h4 className="mt-2 text-xl font-medium text-white">{product.nombre}</h4>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/62">
                    {getProductStatusLabel(product.disponible)}
                  </span>
                </div>
                <p className="text-sm leading-6 text-white/58">{product.descripcion || "Disponible en FLEX."}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium text-white">{formatCurrency(product.precio)}</p>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="inline-flex items-center gap-2 text-sm text-[#9b5cff]"
                  >
                    <Eye className="h-4 w-4" />
                    Ver detalle
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <GlassCard key={product.id} className="overflow-hidden p-0">
            <ProductImage product={product} />
            <div className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
                    {getProductCategoryLabel(product.categoria)}
                  </p>
                  <h4 className="mt-2 text-xl font-medium text-white">{product.nombre}</h4>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/62">
                  {getProductStatusLabel(product.disponible)}
                </span>
              </div>
              <p className="text-sm leading-6 text-white/58">{product.descripcion || "Disponible en FLEX."}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-white">{formatCurrency(product.precio)}</p>
                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="inline-flex items-center gap-2 text-sm text-[#9b5cff]"
                >
                  <Eye className="h-4 w-4" />
                  Ver detalle
                </button>
              </div>
            </div>
          </GlassCard>
        ))}

        {filteredProducts.length === 0 ? (
          <GlassCard className="col-span-full p-8 text-center text-sm text-white/58">
            No hay productos que coincidan con la búsqueda.
          </GlassCard>
        ) : null}
      </div>

      <DialogShell
        open={Boolean(selectedProduct)}
        title={selectedProduct?.nombre ?? "Producto"}
        description={selectedProduct ? getProductCategoryLabel(selectedProduct.categoria) : ""}
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct ? (
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <ProductImage product={selectedProduct} />
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
                  {getProductCategoryLabel(selectedProduct.categoria)}
                </p>
                <h4 className="text-3xl font-medium text-white">{selectedProduct.nombre}</h4>
              </div>
              <p className="text-sm leading-6 text-white/60">{selectedProduct.descripcion || "Disponible en FLEX."}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">Precio</p>
                  <p className="mt-2 text-lg text-white">{formatCurrency(selectedProduct.precio)}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">Estado</p>
                  <p className="mt-2 text-lg text-white">{getProductStatusLabel(selectedProduct.disponible)}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm leading-6 text-white/62">
                Incluye id, precio, categoría e imagen pública. Listo para integrarse con carrito y checkout.
              </div>
            </div>
          </div>
        ) : null}
      </DialogShell>
    </div>
  );
}
