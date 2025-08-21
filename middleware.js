import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const user = req.nextauth.token;

    if (!user) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (pathname.startsWith('/instructor') && user.role !== 'instructor') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    if (pathname.startsWith('/student') && user.role !== 'student') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/instructor/:path*', '/student/:path*'],
};