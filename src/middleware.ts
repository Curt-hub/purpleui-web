import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let the sign-in page and all internal Next.js routes through
  if (
    pathname.startsWith('/auth') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // If no session cookie, send to sign-in page
  const session = request.cookies.get('purpleui-session');
  if (!session) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};


