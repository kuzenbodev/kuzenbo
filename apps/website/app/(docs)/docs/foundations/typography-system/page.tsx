import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Typography System";
const description =
  "Use Kuzenbo typography primitives for semantic hierarchy, consistent variants, and composable render targets.";
const href = "/docs/foundations/typography-system";

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
