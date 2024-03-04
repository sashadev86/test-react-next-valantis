import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Test Valantis",
  description: "Test task from Valantis company",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="bg-zinc-200">{children}</body>
    </html>
  );
}
