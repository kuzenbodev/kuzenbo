import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Pie Chart";
const description =
  "Visualize part-to-whole distributions with optional labels, legend highlighting, radial sizing, and tooltip source control.";
const href = "/docs/components/pie-chart";

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
