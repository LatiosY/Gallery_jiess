import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { I18nProvider } from "@/components/I18nProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gallery-jiess.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jiess — Artist Gallery",
  description: "Selected works by Jiess — illustration, painting, and mixed media.",
  openGraph: {
    title: "Jiess — Artist Gallery",
    description: "Selected works by Jiess — illustration, painting, and mixed media.",
    url: "/",
    siteName: "Jiess Gallery",
    images: [
      {
        url: "/images/og/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jiess Artist Gallery",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jiess — Artist Gallery",
    description: "Selected works by Jiess — illustration, painting, and mixed media.",
    images: ["/images/og/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--color-bg)" }}>
        <I18nProvider>
          <Nav />
          <main className="flex-1 pt-[57px]">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
