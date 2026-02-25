import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "useChartConfig";
const description =
  "Read the current chart context from Chart.Provider or Chart.Root, including config, chart id, and color resolver helpers.";
const href = "/docs/hooks/use-chart-config";

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
