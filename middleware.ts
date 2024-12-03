<<<<<<< HEAD
export { default } from 'next-auth/middleware'

export const config = {
  // api と signin は未認証でも使いたいので弾く
  // _next は web フォントの読み込み等でも middleware が反応していたので除外してみた
  matcher: ['/((?!api|signin|_next).*)'],
}
=======
import { authConfig } from '@/auth.config';
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from '@/routes';
import NextAuth from 'next-auth';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  return;
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
>>>>>>> 9f6fa812029e595d0de2bf39555a58b596fc3821
