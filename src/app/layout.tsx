import { AuthProvider } from "@/provider/auth/AuthProvider";
import { IndexedDBProvider } from "@/provider/db/IndexedDBProvider";
import I18nProvider from "@/provider/i18n/I18nProvider";
import ThemeRegistry from "@/provider/theme/ThemeRegistry";
import { MainLayout } from "@/template";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitsCore Legal",
  description:
    "Plataforma FitsCore Legal: gerenciamento de usuários, envio de FitScores e dashboards para recrutadores",
  icons: {
    icon: "/logo/favicon.ico",
    apple: "/logo/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <IndexedDBProvider>
          <AuthProvider>
            <ThemeRegistry>
              <I18nProvider>
                <MainLayout>{children}</MainLayout>
              </I18nProvider>
            </ThemeRegistry>
          </AuthProvider>
        </IndexedDBProvider>
      </body>
    </html>
  );
}
