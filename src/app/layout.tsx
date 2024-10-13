import type { Metadata } from "next";
import { Providers } from "@/components";
import "./globals.css";
import {  inter } from "@/config/fonts";


export const metadata: Metadata = {
  title: {
    template: '%s - PASSION | SHOP ',
    default: 'Home - PASSION | SHOP '
  },
  description: "Online Clothing Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased `}
      >
        <Providers>
         {children}
        </Providers>
      
      </body>
    </html>
  );
}
