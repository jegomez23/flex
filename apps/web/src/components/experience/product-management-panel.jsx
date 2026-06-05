"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Eye, Pencil, Plus, Search, Trash2, Upload, X } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { formatCurrency, getProductCategoryLabel, getProductStatusLabel, groupProductsByCategory, normalizeProductRow, PRODUCT_CATEGORY_LABELS } from "@/lib/products";

const CATEGORY_OPTIONS = Object.entries(PRODUCT_CATEGORY_LABELS);

const EMPTY_FORM = {
  id: null,
  nombre: "",
  descripcion: "",
  categoria: "bebida",
  precio: "",
  disponible: true,
  estado: "activo",
  removeImage: false,
  imagen_url: null,
};

function productImageSrc(product) {
  return product.imagen_url || null;
}

function DialogShell({ open, title, description, children, onClose, widthClass = "max-w-3xl" }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className={`w-full ${widthClass} rounded-[32px] border border-white/10 bg-[#090909] shadow-[0_30px_120px_rgba(0,0,0,0.65)]`}>
        <div className="flex items-start justify-between gap-4 border-b border-white/8 px-6 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Producto</p>
            <h3 className="mt-2 text-2xl font-medium text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/58">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:bg-white/[0.08]"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}

function SheetShell({ open, title, description, children, onClose }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-xl border-l border-white/10 bg-[#07070d] shadow-[0_0_60px_rgba(0,0,0,0.5)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/8 px-6 py-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Vista previa</p>
            <h3 className="mt-2 text-2xl font-medium text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-white/58">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:bg-white/[0.08]"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="h-[calc(100%-76px)] overflow-y-auto px-6 py-6">{children}</div>
      </aside>
    </div>
  );
}

function AlertDialogShell({ open, title, description, confirmLabel, onConfirm, onCancel, intent = "danger" }) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#090909] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.7)]">
        <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Confirmación</p>
        <h3 className="mt-2 text-2xl font-medium text-white">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/58">{description}</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/72 transition hover:bg-white/[0.06]"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-full px-5 py-3 text-sm font-medium transition ${
              intent === "danger"
                ? "bg-red-500/90 text-white hover:bg-red-500"
                : "bg-[#9b5cff] text-white hover:bg-[#8a4df5]"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="fixed right-4 top-4 z-[70] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-2xl border px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.4)] ${
            toast.variant === "error"
              ? "border-red-500/30 bg-red-500/10 text-red-100"
              : "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm leading-6">{toast.message}</p>
            <button type="button" onClick={() => onDismiss(toast.id)} className="text-white/60">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductImage({ product }) {
  if (!product.imagen_url) {
    return (
      <div className="grid aspect-[4/3] w-full place-items-center rounded-[24px] border border-white/10 bg-[linear-gradient(160deg,rgba(155,92,255,0.18),rgba(0,212,255,0.08),rgba(255,255,255,0.02))] text-center">
        <div className="space-y-2 px-4">
          <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Sin imagen</p>
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
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 40vw"
      />
    </div>
  );
}

function ProductForm({ form, onChange, onFileChange, onSubmit, onCancel, loading }) {
  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/38">Nombre</span>
          <input
            name="nombre"
            value={form.nombre}
            onChange={onChange}
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/20"
            placeholder="Gin-tonic premium"
          />
        </label>

        <label className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/38">Categoría</span>
          <select
            name="categoria"
            value={form.categoria}
            onChange={onChange}
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none focus:border-white/20"
          >
            {CATEGORY_OPTIONS.map(([value, label]) => (
              <option key={value} value={value} className="bg-[#0b0b11]">
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-[10px] uppercase tracking-[0.28em] text-white/38">Descripción</span>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={onChange}
          rows={4}
          className="w-full rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/20"
          placeholder="Describe el producto para que el cliente lo sienta premium."
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/38">Precio</span>
          <input
            name="precio"
            type="number"
            min="0"
            step="0.01"
            value={form.precio}
            onChange={onChange}
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/20"
            placeholder="9.50"
          />
        </label>

        <label className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/38">Imagen</span>
          <input
            name="imagen"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="block h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-white hover:file:bg-white/15"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
          <input
            name="disponible"
            type="checkbox"
            checked={form.disponible}
            onChange={onChange}
            className="h-4 w-4 rounded border-white/20 bg-transparent text-[#9b5cff]"
          />
          <span className="text-sm text-white/72">Producto activo y visible para clientes</span>
        </label>

        <label className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/38">Estado</span>
          <select
            name="estado"
            value={form.estado}
            onChange={onChange}
            className="h-12 min-w-40 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none focus:border-white/20"
          >
            <option value="activo" className="bg-[#0b0b11]">
              Activo
            </option>
            <option value="inactivo" className="bg-[#0b0b11]">
              Inactivo
            </option>
          </select>
        </label>

        {form.id ? (
          <label className="flex items-center gap-3 text-sm text-white/72">
            <input
              name="removeImage"
              type="checkbox"
              checked={form.removeImage}
              onChange={onChange}
              className="h-4 w-4 rounded border-white/20 bg-transparent text-[#9b5cff]"
            />
            Quitar imagen actual
          </label>
        ) : null}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/72 transition hover:bg-white/[0.06]"
        >
          Cancelar
        </button>
        <NeonButton type="submit" disabled={loading}>
          {loading ? "Guardando..." : form.id ? "Actualizar producto" : "Crear producto"}
        </NeonButton>
      </div>
    </form>
  );
}

export function ProductManagementPanel({ products: initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts.map(normalizeProductRow));
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !search ||
        product.nombre.toLowerCase().includes(search.toLowerCase()) ||
        (product.descripcion ?? "").toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === "all" || product.categoria === category;
      const matchesStatus =
        status === "all" ||
        (status === "active" && product.disponible) ||
        (status === "inactive" && !product.disponible);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [category, products, search, status]);

  const featuredProducts = useMemo(() => {
    return products.filter((product) => product.disponible).slice(0, 3);
  }, [products]);

  const grouped = useMemo(() => groupProductsByCategory(filteredProducts), [filteredProducts]);

  const stats = useMemo(
    () => [
      { label: "Productos", value: String(products.length) },
      { label: "Activos", value: String(products.filter((product) => product.disponible).length) },
      { label: "Imágenes", value: String(products.filter((product) => product.imagen_url).length) },
    ],
    [products],
  );

  function addToast(message, variant = "success") {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((current) => [...current, { id, message, variant }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  }

  function openCreateForm() {
    setForm(EMPTY_FORM);
    setFormOpen(true);
  }

  function openEditForm(product) {
    setForm({
      id: product.id,
      nombre: product.nombre,
      descripcion: product.descripcion ?? "",
      categoria: product.categoria,
      precio: product.precio,
      disponible: Boolean(product.disponible),
      estado: product.disponible ? "activo" : "inactivo",
      removeImage: false,
      imagen_url: product.imagen_url ?? null,
    });
    setFormOpen(true);
  }

  function openSheet(product) {
    setSelectedProduct(product);
    setSheetOpen(true);
  }

  function openDeleteAlert(product) {
    setDeleteTarget(product);
    setAlertOpen(true);
  }

  function closeAllDialogs() {
    setFormOpen(false);
    setSheetOpen(false);
    setAlertOpen(false);
    setSelectedProduct(null);
    setDeleteTarget(null);
  }

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    if (name === "estado") {
      setForm((current) => ({
        ...current,
        estado: value,
        disponible: value === "activo",
      }));
      return;
    }
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "disponible"
        ? {
            estado: checked ? "activo" : "inactivo",
          }
        : {}),
    }));
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0] ?? null;
    setForm((current) => ({
      ...current,
      imagen: file,
      removeImage: false,
    }));
  }

  async function submitForm(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const endpoint = form.id ? `/api/admin/productos/${form.id}` : "/api/admin/productos";
      const method = form.id ? "PATCH" : "POST";
      const payload = new FormData();

      payload.append("nombre", form.nombre);
      payload.append("descripcion", form.descripcion);
      payload.append("categoria", form.categoria);
      payload.append("precio", form.precio);
      payload.append("disponible", String(form.disponible));
      payload.append("estado", form.estado);
      payload.append("removeImage", String(Boolean(form.removeImage)));

      if (form.imagen instanceof File) {
        payload.append("imagen", form.imagen);
      }

      const response = await fetch(endpoint, {
        method,
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo guardar el producto.");
      }

      const savedProduct = normalizeProductRow(data.product);

      setProducts((current) => {
        if (form.id) {
          return current.map((product) => (product.id === savedProduct.id ? savedProduct : product));
        }

        return [savedProduct, ...current];
      });

      addToast(form.id ? "Producto actualizado." : "Producto creado.");
      closeAllDialogs();
      setForm(EMPTY_FORM);
    } catch (error) {
      addToast(error instanceof Error ? error.message : "Error inesperado.", "error");
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct() {
    if (!deleteTarget) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/productos/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo eliminar el producto.");
      }

      setProducts((current) => current.filter((product) => product.id !== deleteTarget.id));
      addToast("Producto eliminado.");
      closeAllDialogs();
    } catch (error) {
      addToast(error instanceof Error ? error.message : "No se pudo eliminar.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="productos" className="scroll-mt-24 space-y-6">
      <ToastStack toasts={toasts} onDismiss={(id) => setToasts((current) => current.filter((toast) => toast.id !== id))} />

      <GlassCard className="space-y-6 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Productos</p>
            <h2 className="text-2xl font-medium text-white">Gestión real del catálogo</h2>
            <p className="max-w-2xl text-sm leading-6 text-white/58">
              Administra bebidas, comida y packs desde Supabase Storage y la tabla
              public.productos.
            </p>
          </div>

          <NeonButton onClick={openCreateForm}>
            <Plus className="h-4 w-4" />
            Nuevo producto
          </NeonButton>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-[0.24em] text-white/36">{stat.label}</p>
              <p className="mt-3 text-2xl font-medium text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
            <Search className="h-4 w-4 text-white/48" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar producto, descripción o pack"
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

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none"
          >
            <option value="all" className="bg-[#0b0b11]">Todos los estados</option>
            <option value="active" className="bg-[#0b0b11]">Activos</option>
            <option value="inactive" className="bg-[#0b0b11]">Inactivos</option>
          </select>
        </div>
      </GlassCard>

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
                  <h3 className="mt-2 text-xl font-medium text-white">{product.nombre}</h3>
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
                  onClick={() => openSheet(product)}
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

      <GlassCard className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/38">Tabla</p>
            <h2 className="mt-2 text-xl font-medium text-white">Catálogo completo</h2>
          </div>
          <p className="text-sm text-white/54">{filteredProducts.length} productos</p>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-white/10">
          <table className="w-full text-left">
            <thead className="bg-white/[0.03] text-[10px] uppercase tracking-[0.28em] text-white/42">
              <tr>
                <th className="px-4 py-3">Producto</th>
                <th className="px-4 py-3">Categoría</th>
                <th className="px-4 py-3">Precio</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-white/8">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                        {product.imagen_url ? (
                          <Image
                            src={product.imagen_url}
                            alt={product.nombre}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div>
                        <p className="font-medium text-white">{product.nombre}</p>
                        <p className="text-sm text-white/50">{product.descripcion || "Sin descripción"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-white/70">{getProductCategoryLabel(product.categoria)}</td>
                  <td className="px-4 py-4 text-sm text-white/70">{formatCurrency(product.precio)}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/62">
                      {getProductStatusLabel(product.disponible)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openSheet(product)}
                        className="rounded-full border border-white/10 p-2 text-white/70 transition hover:bg-white/[0.06]"
                        aria-label="Ver producto"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditForm(product)}
                        className="rounded-full border border-white/10 p-2 text-white/70 transition hover:bg-white/[0.06]"
                        aria-label="Editar producto"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteAlert(product)}
                        className="rounded-full border border-red-500/30 p-2 text-red-200 transition hover:bg-red-500/10"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-white/52">
                    No hay productos que coincidan con los filtros.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <SheetShell
        open={sheetOpen && Boolean(selectedProduct)}
        title={selectedProduct?.nombre ?? "Producto"}
        description={selectedProduct ? getProductCategoryLabel(selectedProduct.categoria) : ""}
        onClose={closeAllDialogs}
      >
        {selectedProduct ? (
          <div className="space-y-6">
            <ProductImage product={selectedProduct} />
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.32em] text-white/38">
                    {getProductCategoryLabel(selectedProduct.categoria)}
                  </p>
                  <h4 className="mt-2 text-3xl font-medium text-white">{selectedProduct.nombre}</h4>
                </div>
                <p className="text-xl font-medium text-white">{formatCurrency(selectedProduct.precio)}</p>
              </div>
              <p className="text-sm leading-6 text-white/60">{selectedProduct.descripcion || "Disponible en FLEX."}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">Estado</p>
                  <p className="mt-2 text-sm text-white">{getProductStatusLabel(selectedProduct.disponible)}</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/34">Preparado para pedido</p>
                  <p className="mt-2 text-sm text-white">Incluye id, precio, categoría e imagen pública para checkout futuro.</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </SheetShell>

      <DialogShell
        open={formOpen}
        title={form.id ? "Editar producto" : "Nuevo producto"}
        description="Actualiza el catálogo con datos reales y una imagen pública desde Supabase Storage."
        onClose={closeAllDialogs}
        widthClass="max-w-4xl"
      >
        <ProductForm
          form={form}
          loading={loading}
          onChange={handleChange}
          onFileChange={handleFileChange}
          onSubmit={submitForm}
          onCancel={closeAllDialogs}
        />
      </DialogShell>

      <AlertDialogShell
        open={alertOpen && Boolean(deleteTarget)}
        title={`Eliminar ${deleteTarget?.nombre ?? "producto"}`}
        description="Se eliminará el producto y también su imagen pública del bucket productos si existe."
        confirmLabel={loading ? "Eliminando..." : "Eliminar definitivamente"}
        onConfirm={deleteProduct}
        onCancel={closeAllDialogs}
        intent="danger"
      />
    </section>
  );
}
