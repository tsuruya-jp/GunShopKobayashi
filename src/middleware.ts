import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

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
  "/login"
];

const privatePage = [
  "/admin"
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

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})?$`,
    "i"
  );
  const url = req.nextUrl.pathname;
  const isPublicPage = publicPathnameRegex.test(url);
  if (isPublicPage) {
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
