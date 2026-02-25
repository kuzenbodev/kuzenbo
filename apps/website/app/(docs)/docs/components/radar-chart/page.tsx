import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Radar Chart";
const description =
  "Compare multi-series metrics across categories with @kuzenbo/charts RadarChart and polar axis controls.";
const href = "/docs/components/radar-chart";

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
