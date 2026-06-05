export const AUTH_ROLE_COOKIE = "flex-role";

export const ROLE_REDIRECTS = {
  admin: "/dashboard/admin",
  portero: "/dashboard/portero",
  staff: "/dashboard/staff",
  cliente: "/dashboard/cliente",
};

export const ROLE_PATHS = {
  admin: ["/dashboard/admin", "/admin", "/admin-dashboard", "/panel-admin"],
  cliente: [
    "/dashboard/cliente",
    "/inicio",
    "/home",
    "/reservas",
    "/salas-vip",
    "/pedidos",
    "/acceso-qr",
    "/qr-access",
    "/historial",
    "/reservation-history",
    "/perfil",
    "/profile",
    "/sugerencias-dj",
    "/dj-requests",
  ],
  staff: ["/dashboard/staff"],
  portero: ["/dashboard/portero"],
};

export const PUBLIC_ROUTES = [
  "/",
  "/acceso",
  "/login",
  "/register",
  "/registro",
  "/forgot-password",
  "/recuperar-acceso",
];

export function getRoleRedirectPath(role) {
  return ROLE_REDIRECTS[role] ?? ROLE_REDIRECTS.cliente;
}

export function canAccessPath(role, pathname) {
  if (!role) {
    return false;
  }

  const allowedPaths = ROLE_PATHS[role] ?? ROLE_PATHS.cliente;
  return allowedPaths.some((allowedPath) => pathname === allowedPath);
}

export function isPublicRoute(pathname) {
  return PUBLIC_ROUTES.includes(pathname);
}

export function isAuthRoute(pathname) {
  return (
    pathname === "/acceso" ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/registro" ||
    pathname === "/forgot-password" ||
    pathname === "/recuperar-acceso"
  );
}
