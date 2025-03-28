import type { Metadata } from "next";
import "./globals.css";
import { Jost } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AuthCheck } from "@/components/check/auth-check";

const jost = Jost({
  weight: ["400", "500"],
  style: "normal",
  subsets: ["cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ЧТОТИМ",
  description: "Библиотека игр",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-bg text-white ${jost.className}`}>
        <AuthCheck>{children}</AuthCheck>
        <Toaster />
      </body>
    </html>
  );
}
