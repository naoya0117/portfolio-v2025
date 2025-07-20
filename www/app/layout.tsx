import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@/components/providers/ApolloProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/common/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naoya's Portfolio",
  description: "学生エンジニアのポートフォリオサイト。Web開発、Linux、コンテナ技術を中心に学習中のNaoyaの技術経験と開発プロジェクトを紹介します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloProvider>
          <SmoothScroll>
            <div className="min-h-screen bg-background text-foreground">
              <Header />
              {children}
              <Footer />
            </div>
          </SmoothScroll>
        </ApolloProvider>
      </body>
    </html>
  );
}
