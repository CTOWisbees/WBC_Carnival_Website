import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CountdownBanner from "@/components/ui/countdown-banner";
import { SiteContentProvider } from "@/components/site-content-provider";
import { getSiteContent } from "@/lib/site-content";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WBC Solutions — Business Innovation",
  description:
    "World-class business consulting and solutions for modern enterprises.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SiteContentProvider value={content}>
          <CountdownBanner ctaHref="#" />
          {children}
        </SiteContentProvider>
      </body>
    </html>
  );
}
