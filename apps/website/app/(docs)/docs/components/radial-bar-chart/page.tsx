import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Radial Bar Chart";
const description =
  "Prebuilt RadialBarChart for segmented comparisons with label modes, background tracks, and legend-highlight behavior.";
const href = "/docs/components/radial-bar-chart";

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
