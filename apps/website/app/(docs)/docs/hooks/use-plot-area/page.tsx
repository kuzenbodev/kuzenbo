import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "usePlotArea";
const description =
  "Read the computed plot-area rectangle (x, y, width, height) from Recharts chart state.";
const href = "/docs/hooks/use-plot-area";

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
