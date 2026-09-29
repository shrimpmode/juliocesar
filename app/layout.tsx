import type { Metadata } from "next";
import { Indie_Flower } from "next/font/google";
import { ViewTransition } from "react";
import Nav from "@/components/Nav";
import "./globals.css";

// Downloaded at build time and served from the site itself
const indieFlower = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-indie-flower",
});

export const metadata: Metadata = {
  title: "Julio Cesar",
  description:
    "Julio Cesar — software engineer based in Lima, Peru, experienced in building AI products and AI engineering.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={indieFlower.variable}>
      <body className="font-sans antialiased">
        <div className="relative h-screen w-screen overflow-hidden">
          <Nav />
          {/* Route changes blur the old page out and the new one in (globals.css) */}
          <ViewTransition default="page-blur">{children}</ViewTransition>
        </div>
      </body>
    </html>
  );
}
