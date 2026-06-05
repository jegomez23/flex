export const PRODUCT_CATEGORY_LABELS = {
  bebida: "Bebidas",
  comida: "Comida",
  pack: "Packs y servicios VIP",
};

export function formatCurrency(value) {
  return `${Number(value ?? 0).toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`;
}

export function getProductStatusLabel(disponible) {
  return disponible ? "Activo" : "Inactivo";
}

export function getProductCategoryLabel(category) {
  return PRODUCT_CATEGORY_LABELS[category] ?? category ?? "Sin categoria";
}

export function normalizeProductRow(product) {
  return {
    id: product.id,
    nombre: product.nombre ?? "",
    descripcion: product.descripcion ?? "",
    precio: product.precio,
    categoria: product.categoria ?? "bebida",
    imagen_url: product.imagen_url ?? null,
    disponible: Boolean(product.disponible),
    creado_en: product.creado_en ?? null,
  };
}

export function groupProductsByCategory(products = []) {
  const grouped = {
    bebida: [],
    comida: [],
    pack: [],
  };

  products.forEach((product) => {
    const category = product.categoria in grouped ? product.categoria : "pack";
    grouped[category].push(product);
  });

  return grouped;
}
