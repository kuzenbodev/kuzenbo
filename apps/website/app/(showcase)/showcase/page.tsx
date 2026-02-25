import { createPageMetadata } from "@/lib/seo/metadata";

import { ShowcaseIndexClient } from "./showcase-index-client";

export const metadata = createPageMetadata({
  title: "Showcase",
  description:
    "Browse showcase routes for Kuzenbo components, hooks, features, and interactive playground scenarios.",
  canonicalPath: "/showcase",
  openGraphImagePath: "/opengraph-image",
  twitterImagePath: "/twitter-image",
});

export default function ShowcaseIndexPage() {
  return <ShowcaseIndexClient />;
}
