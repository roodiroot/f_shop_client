import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/general/navbar/navbar";
import Footer from "@/components/general/footer/footer";
import ApolloWrapper from "@/components/providers/appolo-providers";
import CartComponent from "@/components/pages/cart/cart-component";

import "./globals.css";
import ToasterRootComponent from "@/components/general/toaster/toaster-root-component";
import ConfirmDialog from "@/components/general/confirm/confirm-dialog";
import { AuthProvider } from "@/context/authcontext";
import { Suspense } from "react";
import { MetrikaTracker } from "@/components/general/metrika-tracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Fashion Store — стильная одежда и аксессуары",
    template: "%s | Fashion Store",
  },

  description:
    "Тестовый интернет-магазин одежды и аксессуаров. Современный fashion-каталог, трендовые образы и удобный онлайн-шопинг.",

  applicationName: "Fashion Store (Demo)",
  generator: "Next.js 16",
  category: "shopping",

  robots: {
    index: false, // ❗ тестовый магазин
    follow: false,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    siteName: "Fashion Store",
    title: "Fashion Store — интернет-магазин одежды",
    description:
      "Тестовый fashion-магазин с акцентом на стиль, минимализм и удобство покупок.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fashion Store — стильная одежда",
      },
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloWrapper>
          <AuthProvider>
            <ToasterRootComponent />
            <Navbar />
            {children}
            <Footer />
            <CartComponent />
            <ConfirmDialog />
          </AuthProvider>
        </ApolloWrapper>
        <Suspense>
          <MetrikaTracker />
        </Suspense>
      </body>
    </html>
  );
}
