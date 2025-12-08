import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// For monospace elements
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Innovator | Building Digital Future Together",
  description: "Transform your business through Generative AI, professional services, and exciting SaaS solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetBrainsMono.variable} font-sans antialiased bg-white dark:bg-black`}
      >
        {children}
      </body>
    </html>
  );
}