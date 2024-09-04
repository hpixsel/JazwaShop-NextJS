import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  if (
    request.cookies.has("session") && 
    (request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (
    !request.cookies.has("session") && 
    (request.nextUrl.pathname === "/dodaj" ||
    request.nextUrl.pathname === "/ustawienia" ||
    request.nextUrl.pathname.startsWith("/ustawienia"))

  ) {
    return NextResponse.redirect(new URL('/login', request.url))

  }
}

export const config = {
  matcher: ['/login', '/register', '/dodaj', '/ustawienia/:path*'],
}