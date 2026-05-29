import type { Metadata } from "next";
import "./globals.css";
import { COLORS } from "@/lib/design-system";

import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "Plokitch Dashboard | Operational Control",
  description: "Modern food delivery and vendor operations platform.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" }
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body">
        <AuthProvider>
          <div className="min-h-screen bg-beige">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

