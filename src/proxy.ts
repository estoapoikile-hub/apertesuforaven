import { NextResponse, type NextRequest } from "next/server";

// Chequeo optimista: sin cookie de sesión no se entra al panel.
// La verificación real (firma y rol) se hace en cada página del panel.
export function proxy(request: NextRequest) {
  if (!request.cookies.has("apf_session")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/panel/:path*"],
};
