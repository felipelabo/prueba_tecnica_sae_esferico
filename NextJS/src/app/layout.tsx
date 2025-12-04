import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prueba Técnica Esférico SAE",
  description: "Aplicación desarrollada para la prueba técnica de Esférico SAE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
