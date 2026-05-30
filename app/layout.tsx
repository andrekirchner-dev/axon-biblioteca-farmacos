import type { Metadata } from "next";
import { DM_Serif_Display, IBM_Plex_Mono, Lora } from "next/font/google";
import PhoneShell from "@/components/PhoneShell";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const lora = Lora({
  weight: ["400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axonpédia — Biblioteca de Fármacos",
  description: "Biblioteca interativa de psicofarmacologia para psiquiatras e residentes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${dmSerif.variable} ${ibmMono.variable} ${lora.variable}`}>
      <body>
        <PhoneShell>{children}</PhoneShell>
      </body>
    </html>
  );
}
