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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Naoya's Portfolio",
    description: "学生エンジニアのポートフォリオサイト。Web開発、Linux、コンテナ技術を中心に学習中のNaoyaの技術経験と開発プロジェクトを紹介します。",
    type: "website",
    locale: "ja_JP",
    siteName: "Naoya's Portfolio",
    images: [
      {
        url: "/images/profile.webp",
        width: 1200,
        height: 630,
        alt: "Naoya's Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Naoya's Portfolio",
    description: "学生エンジニアのポートフォリオサイト。Web開発、Linux、コンテナ技術を中心に学習中のNaoyaの技術経験と開発プロジェクトを紹介します。",
    images: ["/images/profile.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ["Naoya", "ポートフォリオ", "学生エンジニア", "Web開発", "Linux", "コンテナ技術", "フロントエンド", "バックエンド"],
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
