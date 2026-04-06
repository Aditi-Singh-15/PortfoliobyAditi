import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aditi Singh | Portfolio",
  description: "A non-linear creative landing page for Aditi Singh."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="h-full w-full">{children}</div>
      </body>
    </html>
  );
}
