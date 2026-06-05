import {
  CalendarRange,
  CreditCard,
  Disc3,
  History,
  Martini,
  Music4,
  QrCode,
  ShieldCheck,
  Sofa,
  Sparkles,
  UserRound,
  Wrench,
} from "lucide-react";

const CLIENT_NAV = [
  { label: "Inicio", href: "/inicio", icon: Sparkles },
  { label: "Reservas", href: "/reservas", icon: CalendarRange },
  { label: "Salas VIP", href: "/salas-vip", icon: Sofa },
  { label: "Pedidos", href: "/pedidos", icon: CreditCard },
  { label: "Mi QR", href: "/acceso-qr", icon: QrCode },
  { label: "Historial", href: "/historial", icon: History },
  { label: "Perfil", href: "/perfil", icon: UserRound },
  { label: "Sugerir cancion", href: "/sugerencias-dj", icon: Music4 },
];

const STAFF_NAV = [
  { label: "Operaciones", href: "/dashboard/staff", icon: Wrench },
  { label: "Pedidos", href: "/dashboard/staff#pedidos", icon: CreditCard },
  { label: "Reservas activas", href: "/dashboard/staff#reservas", icon: CalendarRange },
  { label: "Gestion operativa", href: "/dashboard/staff#operativa", icon: Disc3 },
];

const PORTERO_NAV = [
  { label: "Escanear QR", href: "/dashboard/portero", icon: QrCode },
  { label: "Validar acceso", href: "/dashboard/portero#validar", icon: ShieldCheck },
  { label: "Reservas activas", href: "/dashboard/portero#reservas", icon: CalendarRange },
  { label: "Entradas", href: "/dashboard/portero#entradas", icon: UserRound },
];

const ADMIN_NAV = [
  { label: "Usuarios", href: "/dashboard/admin#usuarios", icon: UserRound },
  { label: "Reservas", href: "/dashboard/admin#reservas", icon: CalendarRange },
  { label: "Pedidos", href: "/dashboard/admin#pedidos", icon: Martini },
  { label: "Productos", href: "/dashboard/admin#productos", icon: CreditCard },
  { label: "Mesas", href: "/dashboard/admin#mesas", icon: Disc3 },
  { label: "Salas VIP", href: "/dashboard/admin#salas-vip", icon: Sofa },
  { label: "Estadisticas", href: "/dashboard/admin#estadisticas", icon: Sparkles },
  { label: "Configuracion", href: "/dashboard/admin#configuracion", icon: Wrench },
];

const MOBILE_CLIENT_NAV = [
  { label: "Inicio", href: "/inicio", icon: Sparkles },
  { label: "Reservas", href: "/reservas", icon: CalendarRange },
  { label: "QR", href: "/acceso-qr", icon: QrCode },
  { label: "Pedidos", href: "/pedidos", icon: CreditCard },
  { label: "Perfil", href: "/perfil", icon: UserRound },
];

const MOBILE_STAFF_NAV = [
  { label: "Ops", href: "/dashboard/staff", icon: Wrench },
  { label: "Pedidos", href: "/dashboard/staff#pedidos", icon: CreditCard },
  { label: "Reservas", href: "/dashboard/staff#reservas", icon: CalendarRange },
  { label: "Inicio", href: "/dashboard/staff", icon: Sparkles },
];

const MOBILE_PORTERO_NAV = [
  { label: "QR", href: "/dashboard/portero", icon: QrCode },
  { label: "Validar", href: "/dashboard/portero#validar", icon: ShieldCheck },
  { label: "Reservas", href: "/dashboard/portero#reservas", icon: CalendarRange },
  { label: "Entradas", href: "/dashboard/portero#entradas", icon: UserRound },
];

const MOBILE_ADMIN_NAV = [
  { label: "Admin", href: "/dashboard/admin", icon: Wrench },
  { label: "Reservas", href: "/dashboard/admin#reservas", icon: CalendarRange },
  { label: "Pedidos", href: "/dashboard/admin#pedidos", icon: Martini },
  { label: "Usuarios", href: "/dashboard/admin#usuarios", icon: UserRound },
];

export function getNavigationForRole(role) {
  if (role === "admin") {
    return { desktop: ADMIN_NAV, mobile: MOBILE_ADMIN_NAV, homeHref: "/dashboard/admin" };
  }

  if (role === "staff") {
    return { desktop: STAFF_NAV, mobile: MOBILE_STAFF_NAV, homeHref: "/dashboard/staff" };
  }

  if (role === "portero") {
    return { desktop: PORTERO_NAV, mobile: MOBILE_PORTERO_NAV, homeHref: "/dashboard/portero" };
  }

  return { desktop: CLIENT_NAV, mobile: MOBILE_CLIENT_NAV, homeHref: "/inicio" };
}
