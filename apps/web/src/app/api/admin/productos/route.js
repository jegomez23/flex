import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireProfileRole } from "@/lib/supabase/queries";
import { PRODUCT_IMAGES_BUCKET, buildProductImagePath } from "@/lib/storage";
import { normalizeProductRow } from "@/lib/products";

async function getAdminContext() {
  const context = await requireProfileRole(["admin"]);

  if (!context.user) {
    return { context, status: 401, error: "Debes iniciar sesión." };
  }

  if (!context.allowed) {
    return { context, status: 403, error: "No tienes permisos para gestionar productos." };
  }

  return { context, status: 200, error: null };
}

function toBoolean(value) {
  return value === true || value === "true" || value === "on" || value === "1";
}

function sanitizeCategory(value) {
  return ["bebida", "comida", "pack"].includes(value) ? value : null;
}

async function uploadProductImage(supabase, name, file) {
  if (!file || typeof file === "string" || file.size === 0) {
    return { imageUrl: null };
  }

  const objectPath = buildProductImagePath(name, file.name);
  const { error } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(objectPath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(objectPath);
  return { imageUrl: data.publicUrl };
}

export async function POST(request) {
  const { context, status, error } = await getAdminContext();

  if (error) {
    return NextResponse.json({ error }, { status });
  }

  const formData = await request.formData();
  const nombre = String(formData.get("nombre") ?? "").trim();
  const descripcion = String(formData.get("descripcion") ?? "").trim();
  const categoria = sanitizeCategory(String(formData.get("categoria") ?? "").trim());
  const precio = Number(formData.get("precio"));
  const disponible = toBoolean(formData.get("disponible"));
  const imageFile = formData.get("imagen");

  if (!nombre) {
    return NextResponse.json({ error: "El nombre es obligatorio." }, { status: 400 });
  }

  if (!categoria) {
    return NextResponse.json({ error: "Selecciona una categoría válida." }, { status: 400 });
  }

  if (!Number.isFinite(precio) || precio < 0) {
    return NextResponse.json({ error: "El precio debe ser un número válido." }, { status: 400 });
  }

  const { imageUrl } = await uploadProductImage(context.supabase, nombre, imageFile);

  const { data, error: insertError } = await context.supabase
    .from("productos")
    .insert({
      nombre,
      descripcion: descripcion || null,
      categoria,
      precio,
      imagen_url: imageUrl,
      disponible,
    })
    .select("id, nombre, descripcion, precio, categoria, imagen_url, disponible, creado_en")
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 400 });
  }

  revalidatePath("/dashboard/admin");
  revalidatePath("/menu");
  revalidatePath("/pedidos");

  return NextResponse.json({ product: normalizeProductRow(data) });
}

export async function GET() {
  return NextResponse.json({ error: "Método no permitido." }, { status: 405 });
}
