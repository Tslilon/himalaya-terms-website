// middleware.js

import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "he"],
  defaultLocale: "en",
  localePrefix: "always"
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
};