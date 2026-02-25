import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Bar Chart";
const description =
  "Prebuilt Recharts bar visualizations in @kuzenbo/charts with legend, tooltip, stacking, and waterfall support.";
const href = "/docs/components/bar-chart";

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
