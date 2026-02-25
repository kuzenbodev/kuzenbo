import { createPageMetadata } from "@/lib/seo/metadata";

import { ShowcaseHooksClient } from "./showcase-hooks-client";

export const metadata = createPageMetadata({
  title: "Showcase Hooks",
  description:
    "Review interactive hook demonstrations and usage patterns across Kuzenbo hook APIs.",
  canonicalPath: "/showcase/hooks",
  openGraphImagePath: "/opengraph-image",
  twitterImagePath: "/twitter-image",
});

export default function ShowcaseHooksPage() {
  return <ShowcaseHooksClient />;
}
