import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { COLORS } from "@/lib/design-system";

import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plokitch Dashboard | Operational Control",
  description: "Modern food delivery and vendor operations platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-beige">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
