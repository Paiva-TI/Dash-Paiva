import { NextRequest, NextResponse, type MiddlewareConfig } from "next/server";

const publicRoutes = [
  { path: '/signin', whenAuthenticated: 'redirect' },
  { path: '/signup', whenAuthenticated: 'redirect' },
  { path: '/dashboard', whenAuthenticated: 'redirect' },
  { path: '/profile', whenAuthenticated: 'redirect' },
  { path: '/admin/colaboradores', whenAuthenticated: 'redirect' },
  { path: '/alerts', whenAuthenticated: 'next' },
  { path: '/avatars', whenAuthenticated: 'next' },
  { path: '/badge', whenAuthenticated: 'next' },
  { path: '/buttons', whenAuthenticated: 'next' },
  { path: '/images', whenAuthenticated: 'next' },
  { path: '/videos', whenAuthenticated: 'next' },
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/signin'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route.path == path)
  const authToken = request.cookies.get('token')

  if (!authToken && publicRoute) {
    return NextResponse.next()
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE

    return NextResponse.redirect(redirectUrl)

  }

  if (authToken && publicRoute && publicRoute.whenAuthenticated == 'redirect') {
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = '/'
  }

  return NextResponse.next()
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',

  ],
}