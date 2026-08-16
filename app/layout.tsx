import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokémon Trading Card Game Pocket",
  description:
    "A high-polish Next.js recreation inspired by the Pokémon Trading Card Game Pocket website for the web game intern interview."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
