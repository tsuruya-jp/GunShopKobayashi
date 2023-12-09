import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { notFound, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const locales = ["ja", "en"];
const publicPages = [
  "/",
  "/about",
  "/contact",
  "/links",
  "/news",
  "/news?/.*",
  "/privacy",
  "/product",
  "/product?/.*",
  "/real_state",
  "/login",
];

const privatePage = [
  "/admin",
]

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "ja",
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token != null
      }
    },
    pages: {
      signIn: "/login",
    },
  }
);

export default async function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})?$`,
    "i"
  );
  const url = req.nextUrl.pathname;
  const isPublicPage = publicPathnameRegex.test(url);
  if (isPublicPage) {
    if (locales.map(v => `/${v}/login`).includes(url)) {
      const token = await getToken({req: req});
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/admin";
      if (token) return NextResponse.redirect(redirectUrl);
    }
    return intlMiddleware(req);
  } else {
    const privatePathnameRegex = RegExp(
      `^(/(${locales.join("|")}))?(${privatePage.join("|")})?$`,
      "i"
    );
    const isPrivatePage = privatePathnameRegex.test(url);
    if (!isPrivatePage) return notFound();
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ]
};
