import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Code Components";
const description =
  "Build code-focused docs and product surfaces with @kuzenbo/code blocks, tabs, diffs, terminals, and playground primitives.";
const href = "/docs/components/code";

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
