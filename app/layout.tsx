import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});
const hanken = Hanken_Grotesk({ variable: "--font-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dholera Smart City — Plot Investment Guide | Revas Realty",
  description:
    "Explore Dholera, India's first greenfield smart city in Gujarat. Understand the master plan, infrastructure and risks, and download our free investment guide.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} ${mono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
