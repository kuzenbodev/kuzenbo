import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { KuzenboProvider } from "@kuzenbo/core/provider";
import { ThemeBootstrapScript, ThemeProvider } from "@kuzenbo/theme";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";

import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/constants/website";
import "@/styles/globals.css";
import {
  createOrganizationJsonLd,
  createWebSiteJsonLd,
  serializeJsonLd,
} from "@/lib/seo/json-ld";

import { Footer } from "./_components/layout/footer";
import { Header } from "./_components/layout/header";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const organizationJsonLd = createOrganizationJsonLd({
  "@type": "Organization",
  name: SITE_NAME,
  url: "https://kuzenbo.com",
});

const webSiteJsonLd = createWebSiteJsonLd({
  "@type": "WebSite",
  name: SITE_NAME,
  url: "https://kuzenbo.com",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kuzenbo.com"),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#f8fffb",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#05210f",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Analytics />
        <SpeedInsights />
        <ThemeBootstrapScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd([organizationJsonLd, webSiteJsonLd]),
          }}
        />
        <ThemeProvider>
          <KuzenboProvider>
            <Header />
            {children}
            <Footer />
          </KuzenboProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
