import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Toggle Group";
const description =
  "Segmented single- or multi-select toggle controls in @kuzenbo/core with shared size, variant, spacing, and orientation context.";
const href = "/docs/components/toggle-group";

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
