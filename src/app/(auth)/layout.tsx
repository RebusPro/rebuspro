import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Montserrat } from "next/font/google";
import { Source_Sans_3 } from "next/font/google";
import { Exo_2 } from "next/font/google";
import "../globals.css";

import Header from "@/components/header";
import Footer from "@/components/footer";

const exo_2 = Exo_2({
  subsets: ["latin"],
  weight: "700",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rebus Pro - Auth",
  description: "Rebus Pro - The best way to manage your events",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${exo_2.className} min-h-screen flex flex-col h-full`}>
        <Header />
        <main className="lex-grow flex flex-col h-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}