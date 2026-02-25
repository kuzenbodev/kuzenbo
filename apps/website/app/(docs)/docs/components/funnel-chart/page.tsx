import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Funnel Chart";
const description =
  "Render stage-dropoff funnels in @kuzenbo/charts with optional labels, legend highlighting, and tooltip strategies.";
const href = "/docs/components/funnel-chart";

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
