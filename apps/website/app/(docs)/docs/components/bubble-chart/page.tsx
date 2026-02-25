import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Bubble Chart";
const description =
  "Prebuilt BubbleChart for multi-series x/y/z comparisons with legend highlighting, reference lines, and formatter controls.";
const href = "/docs/components/bubble-chart";

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
