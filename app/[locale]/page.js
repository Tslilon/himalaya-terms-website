"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const t = useTranslations();
  const params = useParams();
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const currentLocale = params.locale;
  const buttonText = currentLocale === "en" ? "עברית" : "English";

  const handleLanguageChange = () => {
    const newLocale = currentLocale === "en" ? "he" : "en";
    window.location.href = `/${newLocale}`;
  };

  const handleAccept = async () => {
    if (!email) {
      alert(t("emailRequired"));
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale: "en" }),
      });
      
      if (response.ok) {
        alert(t("emailSent"));
      } else {
        alert(t("emailFailed"));
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert(t("emailFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <header className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-sm z-40">
        <div className="absolute top-6 left-10">
        <button
            onClick={handleLanguageChange}
            className={`
                relative inline-flex items-center h-10 px-6 py-2 rounded-full
                transition-all duration-300 ease-in-out
                shadow-md
                font-medium text-sm
                ${
                currentLocale === "en"
                    ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white"
                    : "bg-gradient-to-r from-green-400 to-teal-500 text-white"
                }
                hover:shadow-lg hover:scale-105
            `}
            >
            <span
                className={`
                absolute inset-0 rounded-full bg-black opacity-20
                ${currentLocale === "en" ? "bg-purple-500" : "bg-teal-500"}
                `}
            ></span>
            <span className="relative z-10">{buttonText}</span>
            </button>
        </div>

        <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <Image
            src="/logo.png"
            alt="Himalaya Investments"
            width={120}
            height={120}
            className="object-contain mb-4"
            priority
          />
        </div>
      </header>

      <div 
        className="container mx-auto p-4 pt-48 max-w-4xl" 
        dir={currentLocale === "he" ? "rtl" : "ltr"}
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed mb-8">
              {t("mainText")}
            </p>
          </div>

          <div className="flex flex-col items-center max-w-md mx-auto">
            <div className="w-full relative">
                <input
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                dir="auto"
                className={`
                    w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                    transition-all duration-200 text-white 
                    placeholder-gray-400
                    ${currentLocale === "he" ? "[&::placeholder]:text-right" : "[&::placeholder]:text-left"}
                `}
                />
            </div>
            
            <div className="mt-6 flex justify-center w-full">
              <label className="flex items-center cursor-pointer gap-3 select-none">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-400 text-blue-500 
                           focus:ring-blue-500 transition-colors duration-200"
                />
                <span className="text-gray-300">{t("acceptTerms")}</span>
              </label>
            </div>

            <button
              onClick={handleAccept}
              disabled={!accepted || isLoading}
              className={`
                mt-8 w-full px-6 py-4 rounded-lg font-medium text-lg
                transition-all duration-300 ease-in-out
                ${accepted && !isLoading
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  : "bg-gray-600 cursor-not-allowed text-gray-400"
                }
                transform hover:scale-[1.02]
                shadow-lg hover:shadow-xl
              `}
            >
              {isLoading ? t("processing") : t("acceptButton")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}