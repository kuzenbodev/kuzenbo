import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Accessibility";
const description =
  "Build accessible Kuzenbo interfaces with semantic primitives, robust keyboard support, and testable interaction contracts.";
const href = "/docs/foundations/accessibility";

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
