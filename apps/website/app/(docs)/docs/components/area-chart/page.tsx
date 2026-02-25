import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Area Chart";
const description =
  "Build multi-series area visualizations with legend highlighting, gradient fills, stacking modes, and dual-axis support.";
const href = "/docs/components/area-chart";

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
