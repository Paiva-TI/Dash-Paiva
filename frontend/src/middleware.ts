import { NextRequest, NextResponse, type MiddlewareConfig } from "next/server";

const publicRoutes = [
  { path: '/', whenAuthenticated: 'next' },
  { path: '/_not-found', whenAuthenticated: 'next' },
  { path: '/admin/colaboradores', whenAuthenticated: 'redirect' },
  { path: '/manager/frotas', whenAuthenticated: 'redirect' },
  { path: '/manager/mobilizacao', whenAuthenticated: 'redirect' },
  { path: '/manager/moradia', whenAuthenticated: 'redirect' },
  { path: '/alerts', whenAuthenticated: 'next' },
  { path: '/avatars', whenAuthenticated: 'next' },
  { path: '/badge', whenAuthenticated: 'next' },
  { path: '/bar-chart', whenAuthenticated: 'next' },
  { path: '/blank', whenAuthenticated: 'next' },
  { path: '/buttons', whenAuthenticated: 'next' },
  { path: '/calendar', whenAuthenticated: 'next' },
  { path: '/dashboard', whenAuthenticated: 'redirect' },
  { path: '/error-404', whenAuthenticated: 'next' },
  { path: '/form-elements', whenAuthenticated: 'next' },
  { path: '/images', whenAuthenticated: 'next' },
  { path: '/line-chart', whenAuthenticated: 'next' },
  { path: '/modals', whenAuthenticated: 'next' },
  { path: '/profile', whenAuthenticated: 'redirect' },
  { path: '/signin', whenAuthenticated: 'redirect' },
  { path: '/signup', whenAuthenticated: 'redirect' },
  { path: '/signup-sucess', whenAuthenticated: 'next' },
  { path: '/videos', whenAuthenticated: 'next' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/signin';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Normaliza para evitar problemas com barra no final
  const normalizedPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
  const publicRoute = publicRoutes.find(route => route.path === normalizedPath);
  const authToken = request.cookies.get('token');

  // Não autenticado → rota pública
  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  // Não autenticado → rota privada
  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    return NextResponse.redirect(redirectUrl);
  }

  // Autenticado → rota pública que exige redirecionamento
  if (authToken && publicRoute?.whenAuthenticated === 'redirect') {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
