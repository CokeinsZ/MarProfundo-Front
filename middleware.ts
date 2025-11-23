import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken"); 

  const isAuth = !!token;
  const { pathname } = req.nextUrl;

  // rutas protegidas
  if (pathname.startsWith("/fishbowl") && !isAuth) {
    return NextResponse.next();
  }
  
  if (pathname.startsWith("/profile") && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/fisbowl/:path*,/profile/:path*"],
};


