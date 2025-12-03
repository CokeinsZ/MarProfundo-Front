import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function validateToken(req: NextRequest) {
  const token = req.cookies.get("accessToken"); 
  
  if (!token) {
    return null;
  }

  try {
    const response = await fetch("https://back.mar-abierto.online/users/validate-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token.value,
      }),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
    
  } catch (error) {
    console.error("Error validating token:", error);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  
  const { pathname } = req.nextUrl;
  const user = await validateToken(req);
  const isAuth = user && user.valid;

  if (!isAuth) {
    req.cookies.delete("accessToken");
  }

  // Proteger rutas de admin - verificar rol
  if (pathname.startsWith("/admin") && (!isAuth || user.role !== "admin")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // rutas protegidas
  if (pathname.startsWith("/fishbowl") && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (pathname.startsWith("/aqualog") && !isAuth) {
    return NextResponse.redirect(new URL("/fish", req.url));
  }
  if (pathname.startsWith("/payment") && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  if (pathname.startsWith("/profile") && !isAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/fishbowl/:path*", "/profile/:path*"],
};


