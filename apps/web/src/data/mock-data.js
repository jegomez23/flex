import {
  CalendarRange,
  CreditCard,
  Disc3,
  Martini,
  Music4,
  QrCode,
  ShieldCheck,
  Sofa,
  Sparkles,
  UserRound,
} from "lucide-react";

export const mainNav = [
  { label: "Inicio", href: "/inicio", icon: Sparkles },
  { label: "Explorar", href: "/explorar", icon: Disc3 },
  { label: "Reservas", href: "/reservas", icon: CalendarRange },
  { label: "Pedidos", href: "/pedidos", icon: Martini },
  { label: "Acceso QR", href: "/acceso-qr", icon: QrCode },
  { label: "DJ", href: "/sugerencias-dj", icon: Music4 },
  { label: "Perfil", href: "/perfil", icon: UserRound },
];

export const mobileNav = [
  { label: "Inicio", href: "/inicio", icon: Sparkles },
  { label: "Reservas", href: "/reservas", icon: CalendarRange },
  { label: "QR", href: "/acceso-qr", icon: QrCode },
  { label: "Pedidos", href: "/pedidos", icon: CreditCard },
  { label: "Perfil", href: "/perfil", icon: UserRound },
];

export const quickActions = [
  {
    title: "Reservar mesa",
    subtitle: "Elige zona, hora y numero de personas en pocos pasos.",
    href: "/reservas",
    icon: CalendarRange,
  },
  {
    title: "Salas VIP",
    subtitle: "Compara Sala Negra, Roja y Dorada con una vista clara.",
    href: "/salas-vip",
    icon: Sofa,
  },
  {
    title: "Acceso QR",
    subtitle: "Consulta tu pase y entra sin filas ni pasos extras.",
    href: "/acceso-qr",
    icon: ShieldCheck,
  },
  {
    title: "Pedir ahora",
    subtitle: "Bebidas, cocina y hookah listos antes de llegar.",
    href: "/pedidos",
    icon: CreditCard,
  },
];

export const splashStats = [
  { label: "Aforo de hoy", value: "1.280 invitados" },
  { label: "Espera media", value: "4 min" },
  { label: "Salas VIP", value: "3 ambientes" },
];

export const heroMoments = [
  {
    title: "Entrada privada",
    tag: "Acceso",
    description:
      "Recepcion discreta, flujo rapido y una llegada pensada para sentirse natural.",
  },
  {
    title: "Pista principal",
    tag: "Ambiente",
    description:
      "Vista clara, sonido envolvente y mesas bien ubicadas para vivir la noche con calma.",
  },
  {
    title: "Servicio conectado",
    tag: "Control",
    description:
      "Reservas, pedidos, acceso y sugerencias al DJ dentro de un mismo recorrido.",
  },
];

export const vipRooms = [
  {
    slug: "sala-negra",
    name: "Sala Negra",
    mood: "Sobria, oscura y precisa. Una experiencia privada con caracter silencioso.",
    capacity: "8 a 10 personas",
    price: "Desde 1.000.000 COP",
    accent: "#6b7280",
    border: "rgba(255,255,255,0.14)",
    surface:
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)), rgba(8,8,10,0.82)",
    glow: "0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
    highlights: ["Anfitrion privado", "Luz tenue", "Servicio reservado"],
  },
  {
    slug: "sala-roja",
    name: "Sala Roja",
    mood: "Mas energia y una atmosfera intensa para celebrar sin perder elegancia.",
    capacity: "10 a 12 personas",
    price: "Desde 1.200.000 COP",
    accent: "#ff4d67",
    border: "rgba(255,77,103,0.34)",
    surface:
      "linear-gradient(180deg, rgba(255,77,103,0.14), rgba(18,3,8,0.86)), rgba(18,3,8,0.9)",
    glow: "0 0 36px rgba(255,77,103,0.14), inset 0 1px 0 rgba(255,255,255,0.06)",
    highlights: ["Prioridad musical", "Escena roja", "Montaje de celebracion"],
  },
  {
    slug: "sala-dorada",
    name: "Sala Dorada",
    mood: "La experiencia mas exclusiva de FLEX, con una presencia elegante y calida.",
    capacity: "12 a 15 personas",
    price: "Desde 1.500.000 COP",
    accent: "#d6a54b",
    border: "rgba(214,165,75,0.34)",
    surface:
      "linear-gradient(180deg, rgba(214,165,75,0.16), rgba(20,12,2,0.88)), rgba(20,12,2,0.92)",
    glow: "0 0 40px rgba(214,165,75,0.14), inset 0 1px 0 rgba(255,255,255,0.08)",
    highlights: ["Ingreso preferente", "Servicio dedicado", "Ambiente premium"],
  },
];

export const nextReservation = {
  name: "Sala Dorada",
  schedule: "Sab 24 mayo / 23:00 / 6 personas",
  note: "Tu mesa estara lista al llegar y el acceso QR ya esta activo.",
};

export const reservations = [
  {
    code: "M12",
    space: "Pista principal",
    date: "Sab 24 mayo",
    time: "11:30 PM",
    guests: 6,
    status: "Confirmada",
  },
  {
    code: "VIP-3",
    space: "Sala Dorada",
    date: "Vie 31 mayo",
    time: "12:00 AM",
    guests: 8,
    status: "En acceso",
  },
  {
    code: "B08",
    space: "Bar central",
    date: "Jue 06 junio",
    time: "10:45 PM",
    guests: 4,
    status: "Pendiente",
  },
];

export const reservationSteps = [
  "Elige mesa o sala VIP",
  "Define hora, invitados y extras",
  "Recibe tu acceso QR al instante",
];

export const exploreZones = [
  {
    title: "Entrada",
    note: "Ingreso claro, rapido y pensado para llegar sin friccion.",
  },
  {
    title: "Pista principal",
    note: "La energia central del club con buena vista desde cada mesa.",
  },
  {
    title: "Bar central",
    note: "Punto de encuentro con servicio agil y ambiente mas social.",
  },
];

export const menuCategories = [
  {
    name: "Bebidas de autor",
    items: [
      { name: "Margarita Neural", description: "Tequila, citricos y un acabado frio.", price: "45.000 COP" },
      { name: "Red Pulse", description: "Frutos rojos, energia y un final mas seco.", price: "20.000 COP" },
      { name: "Medellin 8", description: "Ron oscuro, cacao y humo ligero.", price: "32.000 COP" },
    ],
  },
  {
    name: "Cocina",
    items: [
      { name: "Mini burgers nocturnas", description: "Carne premium, pan suave y salsa de la casa.", price: "28.000 COP" },
      { name: "Tostadas de atun", description: "Crocantes, frescas y con toque citrico.", price: "24.000 COP" },
      { name: "Papas trufadas", description: "Parmesano, hierbas y sal especial.", price: "18.000 COP" },
    ],
  },
  {
    name: "Hookah",
    items: [
      { name: "Purple Orbit", description: "Frutos rojos con menta suave.", price: "55.000 COP" },
      { name: "Golden Mirage", description: "Vainilla especiada con fondo ambar.", price: "60.000 COP" },
      { name: "Black Current", description: "Uva oscura con toque helado.", price: "52.000 COP" },
    ],
  },
];

export const serviceNotes = [
  "Tiempo estimado de entrega: 8 min",
  "Servicio a mesa disponible en todas las salas VIP",
  "Confirmacion rapida para uso con una mano",
];

export const djRequests = [
  { title: "Blinding Lights", artist: "The Weeknd", vibe: "Hora alta" },
  { title: "TQG", artist: "Karol G / Shakira", vibe: "Subida latina" },
  { title: "One More Time", artist: "Daft Punk", vibe: "Retro futurista" },
];

export const notifications = [
  "Tu acceso a Sala Dorada ya esta activo.",
  "El servicio de botellas llega a tu mesa a las 11:40 PM.",
  "El DJ acepto una de tus sugerencias.",
];

export const qrDetails = [
  "Reserva vinculada a Sala Dorada",
  "Ingreso preferente activo",
  "6 personas autorizadas en el mismo acceso",
  "Host visible despues del primer escaneo",
];

export const analytics = [
  { label: "Reservas hoy", value: "182", change: "+18%" },
  { label: "Ocupacion VIP", value: "91%", change: "+7%" },
  { label: "Cola de pedidos", value: "34", change: "-12%" },
  { label: "Ingreso medio", value: "6 min", change: "-21%" },
];

export const adminSignals = [
  { label: "Pista principal", value: "Ritmo alto", tint: "var(--violet)" },
  { label: "Recepcion VIP", value: "8 llegadas", tint: "var(--cyan)" },
  { label: "Bar central", value: "12 pedidos", tint: "var(--gold)" },
];

export const settingsGroups = [
  {
    title: "Experiencia",
    items: ["Avisos push", "Actualizaciones discretas", "Guardar mesas favoritas"],
  },
  {
    title: "Pagos",
    items: ["Tarjeta principal terminada en 2048", "Pago rapido activo", "Factura por correo"],
  },
];

export const profileStats = [
  { label: "Noches este mes", value: "14" },
  { label: "Reservas VIP", value: "5" },
  { label: "Sala favorita", value: "Sala Dorada" },
];

export const profileNotes = [
  "Prefieres servicio discreto con confirmacion al llegar.",
  "Tu mejor momento suele ser la pista principal despues de medianoche.",
  "Te interesan mesas con buena vista y acceso QR activo.",
  "Tus pedidos mas frecuentes combinan cocteles de autor y cocina ligera.",
];

export const liveActivity = [
  "Pedido M12 entregado en pista principal.",
  "Sala Roja cambio a escena de mayor intensidad.",
  "3 nuevos ingresos QR en el ultimo minuto.",
];
