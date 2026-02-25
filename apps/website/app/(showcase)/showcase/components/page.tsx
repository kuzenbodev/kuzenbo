import { createPageMetadata } from "@/lib/seo/metadata";

import { ShowcaseComponentsClient } from "./showcase-components-client";

export const metadata = createPageMetadata({
  title: "Showcase Components",
  description:
    "Inspect focused component showcase compositions and UI behavior contracts in Kuzenbo.",
  canonicalPath: "/showcase/components",
  openGraphImagePath: "/opengraph-image",
  twitterImagePath: "/twitter-image",
});

export default function ShowcaseComponentsPage() {
  return <ShowcaseComponentsClient />;
}
