import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Breadcrumb";
const description =
  "Build semantic breadcrumb navigation in @kuzenbo/core with composable items, separators, and overflow affordances.";
const href = "/docs/components/breadcrumb";

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
