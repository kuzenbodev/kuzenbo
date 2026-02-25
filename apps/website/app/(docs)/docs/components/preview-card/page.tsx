import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Preview Card";
const description =
  "Contextual preview overlays with trigger, popup, portal, viewport, and positioning primitives in @kuzenbo/core.";
const href = "/docs/components/preview-card";

export const metadata = createDocsPageMetadata({
  title,
  description,
  href,
});

export default function Page() {
  return (
    <DocsMdxPage description={description} href={href} title={title}>
      <Content />
    </DocsMdxPage>
  );
}
