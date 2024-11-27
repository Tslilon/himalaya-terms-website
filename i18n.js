// i18n.js

export const locales = ["en", "he"];
export const defaultLocale = "en";

export function getLocale(pathname) {
  const segments = pathname.split("/");
  return segments[1];
}

import { headers } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  const headersList = await headers();
  const locale = headersList.get('X-NEXT-INTL-LOCALE') || 'en';

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'Asia/Jerusalem',
    now: new Date()
  };
});