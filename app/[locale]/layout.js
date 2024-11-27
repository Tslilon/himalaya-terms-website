import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "../globals.css";

export default async function LocaleLayout({ children, params }) {
  console.log("LocaleLayout rendering with params:", params);
  
  const locale = params.locale;
  
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
    console.log("Loaded messages for locale:", locale, messages);
  } catch (error) {
    console.error("Error loading messages:", error);
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "he" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider 
          locale={locale} 
          messages={messages}
        >
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
} 