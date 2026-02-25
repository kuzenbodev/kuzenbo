import { createPageMetadata } from "@/lib/seo/metadata";

import { ShowcaseFeaturesClient } from "./showcase-features-client";

export const metadata = createPageMetadata({
  title: "Showcase Features",
  description:
    "Explore feature-level user flows and system narratives built with Kuzenbo primitives.",
  canonicalPath: "/showcase/features",
  openGraphImagePath: "/opengraph-image",
  twitterImagePath: "/twitter-image",
});

export default function ShowcaseFeaturesPage() {
  return <ShowcaseFeaturesClient />;
}
