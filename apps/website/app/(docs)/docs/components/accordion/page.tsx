import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Accordion";
const description =
  "Build expandable sections with @kuzenbo/core Accordion, including variant contracts and composition patterns for dense settings UIs.";
const href = "/docs/components/accordion";

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
