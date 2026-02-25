import { createPageMetadata } from "@/lib/seo/metadata";

import { ShowcasePlaygroundClient } from "./showcase-playground-client";

export const metadata = createPageMetadata({
  title: "Showcase Playground",
  description:
    "Use the Kuzenbo playground route to validate ad-hoc compositions and interaction experiments.",
  canonicalPath: "/showcase/playground",
  openGraphImagePath: "/opengraph-image",
  twitterImagePath: "/twitter-image",
});

export default function ShowcasePlaygroundPage() {
  return <ShowcasePlaygroundClient />;
}
