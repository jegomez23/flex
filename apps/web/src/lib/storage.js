export const PRODUCT_IMAGES_BUCKET = "productos";

export function getSupabasePublicUrl(baseUrl, bucket, objectPath) {
  return `${String(baseUrl).replace(/\/$/, "")}/storage/v1/object/public/${bucket}/${objectPath}`;
}

export function extractPublicStoragePath(url, bucket = PRODUCT_IMAGES_BUCKET) {
  if (!url) {
    return null;
  }

  const marker = `/storage/v1/object/public/${bucket}/`;
  const markerIndex = url.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  return decodeURIComponent(url.slice(markerIndex + marker.length));
}

export function slugifyStorageName(value) {
  return String(value ?? "producto")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "producto";
}

export function buildProductImagePath(name, fileName) {
  const extension = fileName?.includes(".") ? fileName.split(".").pop()?.toLowerCase() : "jpg";
  const safeName = slugifyStorageName(name);
  return `${Date.now()}-${safeName}.${extension || "jpg"}`;
}
