import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import {
  AUTH_ROLE_COOKIE,
  canAccessPath,
  getRoleRedirectPath,
  isAuthRoute,
  isPublicRoute,
} from "@/lib/auth";

function copyCookies(source, target) {
  source.cookies.getAll().forEach((cookie) => {
    target.cookies.set(cookie.name, cookie.value, cookie.options);
  });
}

function applyAuthHeaders(target, headers) {
  Object.entries(headers).forEach(([key, value]) => {
    target.headers.set(key, value);
  });
}

export async function proxy(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
          applyAuthHeaders(response, headers);
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub ?? null;
  const pathname = request.nextUrl.pathname;

  let role = request.cookies.get(AUTH_ROLE_COOKIE)?.value ?? "cliente";

  if (userId) {
    const { data: profile } = await supabase
      .from("perfiles")
      .select("rol")
      .eq("id", userId)
      .maybeSingle();

    if (profile?.rol) {
      role = profile.rol;
      response.cookies.set(AUTH_ROLE_COOKIE, role, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }
  }

  if (!userId && !isPublicRoute(pathname)) {
    const redirectResponse = NextResponse.redirect(new URL("/acceso", request.url));
    copyCookies(response, redirectResponse);
    applyAuthHeaders(redirectResponse, Object.fromEntries(response.headers.entries()));
    return redirectResponse;
  }

  if (userId && (isAuthRoute(pathname) || !canAccessPath(role, pathname))) {
    const redirectResponse = NextResponse.redirect(
      new URL(getRoleRedirectPath(role), request.url),
    );
    copyCookies(response, redirectResponse);
    applyAuthHeaders(redirectResponse, Object.fromEntries(response.headers.entries()));
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
