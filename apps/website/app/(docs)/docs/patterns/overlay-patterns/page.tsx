import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Overlay Patterns";
const description =
  "Production overlay patterns for dialogs, drawers, sheets, popovers, tooltips, and menu surfaces in @kuzenbo/core.";
const href = "/docs/patterns/overlay-patterns";

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
