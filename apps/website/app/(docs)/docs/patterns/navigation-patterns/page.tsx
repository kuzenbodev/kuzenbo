import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Navigation Patterns";
const description =
  "Choose and compose Kuzenbo navigation primitives for global IA, local context, and app command flows.";
const href = "/docs/patterns/navigation-patterns";

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
