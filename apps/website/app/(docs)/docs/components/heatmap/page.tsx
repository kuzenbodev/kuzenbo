import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Heatmap";
const description =
  "Calendar-style Heatmap for date/value datasets with month splitting, outside-date handling, and custom domain/color mapping.";
const href = "/docs/components/heatmap";

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
