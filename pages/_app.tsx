import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Orbitron, Inter } from "next/font/google";
import InteractiveCursor from "@/components/InteractiveCursor";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${orbitron.variable} font-sans`}>
      <InteractiveCursor />
      <Component {...pageProps} />
    </main>
  );
}
