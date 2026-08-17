import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "廟務管理系統",
  description: "寺廟內部廟務管理平台",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
