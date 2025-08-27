import { AuthProvider } from "@/provider/auth/AuthProvider";
import { IndexedDBProvider } from "@/provider/db/IndexedDBProvider";
import { FitScoreProvider } from "@/provider/fitscore/FitScoreProvider";
import I18nProvider from "@/provider/i18n/I18nProvider";
import { ReactQueryProvider } from "@/provider/query/QueryProvider";
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
        <ReactQueryProvider>
          <IndexedDBProvider>
            <AuthProvider>
              <ThemeRegistry>
                <I18nProvider>
                  <FitScoreProvider>
                    <MainLayout>{children}</MainLayout>
                  </FitScoreProvider>
                </I18nProvider>
              </ThemeRegistry>
            </AuthProvider>
          </IndexedDBProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
