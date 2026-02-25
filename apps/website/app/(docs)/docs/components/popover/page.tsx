import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Popover";
const description =
  "Use @kuzenbo/core Popover for contextual overlays with render-prop triggers, aligned positioning, and structured content sections.";
const href = "/docs/components/popover";

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
