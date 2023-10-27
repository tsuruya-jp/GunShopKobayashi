import {withAuth} from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';
 
const locales = ['ja', 'en'];
const publicPages = ['/admin', '/admin/login'];
 
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: 'ja'
});
 
const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({token}) => token != null
    },
    pages: {
      signIn: '/admin/login'
    }
  }
);
 
export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);
  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}
 
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};