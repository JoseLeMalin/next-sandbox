// app/layout.tsx
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TailwindIndicator } from "@/components/utils/TailwindIndicator";
import { SiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren, ReactNode } from "react";
import { Providers } from "./Providers";
import "./globals.css";
import { ButtonPrevPage } from "@/components/Button-Prev-Page";

type RootLayout = {
  modal?: ReactNode;
} & PropsWithChildren;

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout({ modal, children }: RootLayout) {
  return (
    <>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "h-full bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <div className="container h-16 flex-1 sm:justify-between ">
                <div>
                  <ButtonPrevPage />
                </div>
                <div>{children}</div>
              </div>
              <Footer />
            </div>
            <TailwindIndicator />
            <div>{modal}</div>
          </Providers>
        </body>
      </html>
    </>
  );
}
