import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { Viewport } from "next";

// Настройки вьюпорта для мобильных устройств
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0c", // Цвет верхней панели в мобильных браузерах
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap", // Добавляем это
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap", // И сюда
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://my-magic-astro-app.netlify.app"),
  title: "Astro Advice | Персональная натальная карта и астрологический анализ",
  description:
    "Узнайте свою судьбу по звездам. Точный расчет натальной карты и глубокая интерпретация планетарных аспектов. Получите ваш персональный разбор прямо сейчас!",
  icons: {
    icon: "/icon.svg",
  },
  keywords: [
    "астрология",
    "натальная карта",
    "рассчитать гороскоп",
    "прогноз по дате рождения",
    "астрологический разбор",
    "карта звездного неба",
  ],
  authors: [{ name: "Astro Advice Team" }],

  // Настройка для соцсетей
  openGraph: {
    title:
      "Astro Advice | Персональная натальная карта и астрологический анализ",
    description:
      "Рассчитайте свою карту рождения и получите подробную интерпретацию влияния планет на вашу жизнь.",
    url: "https://my-magic-astro-app.netlify.app",
    siteName: "Astro Advice",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Персональная натальная карта Astro Advice",
      },
    ],
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0c] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
