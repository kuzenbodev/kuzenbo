import type { Metadata } from "next";

import {
  normalizePathname,
  resolveSeoConfig,
  toCanonicalUrl,
  type SeoConfig,
} from "@/lib/seo/config";

export const SITE_NAME = "Kuzenbo";
export const DEFAULT_SEO_DESCRIPTION =
  "Build and scale your design system with production-ready Kuzenbo components, hooks, and documentation.";
export const ROOT_TITLE = `${SITE_NAME} | Build Your Design System`;
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";
export const DEFAULT_TWITTER_IMAGE_PATH = "/twitter-image";
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

interface PageMetadataOptions {
  canonicalPath: string;
  description?: string;
  noIndex?: boolean;
  openGraphImagePath?: string;
  openGraphType?: "article" | "website";
  title: string;
  twitterImagePath?: string;
}

const getRobotsMetadata = (noIndex?: boolean): Metadata["robots"] => {
  if (noIndex) {
    return {
      follow: false,
      googleBot: {
        follow: false,
        index: false,
        "max-image-preview": "none",
        "max-snippet": 0,
        "max-video-preview": 0,
      },
      index: false,
    };
  }

  return {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  };
};

const resolveVerification = (): Metadata["verification"] => {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const yandex = process.env.NEXT_PUBLIC_YANDEX_VERIFICATION;

  if (!google && !yandex) {
    return undefined;
  }

  return {
    google: google || undefined,
    yandex: yandex || undefined,
  };
};

const toMetadataUrl = (value: string, config: SeoConfig): string =>
  ABSOLUTE_URL_PATTERN.test(value) ? value : toCanonicalUrl(value, config);

export const createRootMetadata = (
  config: SeoConfig = resolveSeoConfig()
): Metadata => {
  const canonicalUrl = toCanonicalUrl("/", config);
  const openGraphImageUrl = toMetadataUrl(DEFAULT_OG_IMAGE_PATH, config);
  const twitterImageUrl = toMetadataUrl(DEFAULT_TWITTER_IMAGE_PATH, config);

  return {
    metadataBase: config.metadataBase,
    title: {
      default: ROOT_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_SEO_DESCRIPTION,
    applicationName: SITE_NAME,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title: ROOT_TITLE,
      description: DEFAULT_SEO_DESCRIPTION,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [
        {
          url: openGraphImageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} Open Graph Image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ROOT_TITLE,
      description: DEFAULT_SEO_DESCRIPTION,
      images: [twitterImageUrl],
    },
    robots: getRobotsMetadata(false),
    verification: resolveVerification(),
  };
};

export const createPageMetadata = (
  options: PageMetadataOptions,
  config: SeoConfig = resolveSeoConfig()
): Metadata => {
  const canonicalPath = normalizePathname(options.canonicalPath);
  const description = options.description ?? DEFAULT_SEO_DESCRIPTION;
  const openGraphImagePath =
    options.openGraphImagePath ?? DEFAULT_OG_IMAGE_PATH;
  const twitterImagePath =
    options.twitterImagePath ?? DEFAULT_TWITTER_IMAGE_PATH;
  const canonicalUrl = toCanonicalUrl(canonicalPath, config);
  const openGraphImageUrl = toMetadataUrl(openGraphImagePath, config);
  const twitterImageUrl = toMetadataUrl(twitterImagePath, config);

  return {
    metadataBase: config.metadataBase,
    title: options.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: options.openGraphType ?? "website",
      url: canonicalUrl,
      title: options.title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: openGraphImageUrl,
          alt: `${options.title} Open Graph Image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description,
      images: [twitterImageUrl],
    },
    robots: getRobotsMetadata(options.noIndex),
    other: {
      "seo:canonical-url": canonicalUrl,
    },
  };
};
