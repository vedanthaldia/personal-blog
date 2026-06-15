import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vedant",
  description: "A small place on the internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${inter.variable}`}
    >
      <body>
        <div className="container">
          <main>{children}</main>
          
          <nav className="font-sans text-sm">
            <Link href="/">Home</Link>
            <Link href="/now">Now</Link>
            <Link href="/notes">Notes</Link>
            <Link href="/collections">Collections</Link>
            <Link href="/guestbook">Guestbook</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
      </body>
    </html>
  );
}
