import type { Metadata } from "next";
import { Archivo, DM_Serif_Display, Instrument_Sans } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Mosconi Inmobiliaria | Salta",
  description:
    "Inmobiliaria en Salta especializada en venta y alquiler de propiedades, tasaciones y desarrollos inmobiliarios. Más de 21 años de trayectoria en Salta Capital, Zona Norte, Tres Cerritos, San Lorenzo y Vaqueros.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${instrumentSans.variable} ${dmSerifDisplay.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-ink text-paper antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
