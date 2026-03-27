import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: toujours utiliser getUser() (vérifie le token côté serveur)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Redirige vers /login si non authentifié sur les routes protégées
  if (!user && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Redirige vers /affiliate-login si non authentifié sur le dashboard affilié
  if (!user && pathname.startsWith("/affiliate/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/affiliate-login";
    return NextResponse.redirect(url);
  }

  // Redirige si déjà connecté et tente d'accéder à /affiliate-login
  if (user && pathname === "/affiliate-login") {
    const url = request.nextUrl.clone();
    url.pathname = "/affiliate/dashboard";
    return NextResponse.redirect(url);
  }

  // Redirige si déjà connecté et tente d'accéder à /login
  if (user && pathname === "/login") {
    const { data: profile } = await supabase
      .from("profiles")
      .select("has_paid, is_guest")
      .eq("id", user.id)
      .single();
    // Pas de profil du tout → compte affilié uniquement, pas de compte classique
    if (!profile) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("error", "compte_affilie");
      return NextResponse.redirect(url);
    }
    const hasAccess = profile.is_guest === true || profile.has_paid === true;
    const url = request.nextUrl.clone();
    url.pathname = hasAccess ? "/dashboard" : "/checkout";
    return NextResponse.redirect(url);
  }

  // ── Paywall : vérifier que l'utilisateur a payé avant d'accéder au dashboard ──
  if (user && pathname.startsWith("/dashboard")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("has_paid, is_guest")
      .eq("id", user.id)
      .single();

    // Pas de profil du tout → compte affilié uniquement, pas de compte classique
    if (!profile) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("error", "compte_affilie");
      return NextResponse.redirect(url);
    }

    // Les invités (guests) héritent du paiement de leur hôte → accès autorisé
    // Les utilisateurs ayant payé → accès autorisé
    // Tous les autres → paywall
    const hasAccess = profile.is_guest === true || profile.has_paid === true;

    if (!hasAccess) {
      const url = request.nextUrl.clone();
      url.pathname = "/checkout";
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/dashboard/:path*", "/affiliate/:path*", "/admin/:path*", "/login", "/affiliate-login", "/checkout/:path*"],
};
