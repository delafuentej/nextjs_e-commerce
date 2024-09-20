import type { Metadata } from "next";

import "./globals.css";
import {  inter } from "@/config/fonts";


export const metadata: Metadata = {
  title: "E-Commerce | Shop",
  description: "Online Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
