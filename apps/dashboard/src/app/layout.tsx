import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { COLORS } from "@/lib/design-system";

import { AuthProvider } from "@/components/providers/AuthProvider";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-heading',
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-body',
});

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
      <body className={`${dmSans.variable} ${playfair.variable} font-body`}>
        <AuthProvider>
          <div className="min-h-screen bg-beige">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
