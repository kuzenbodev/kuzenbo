import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Badge";
const description =
  "Use Badge in @kuzenbo/core for compact status, taxonomy, and inline metadata labels with semantic variant support.";
const href = "/docs/components/badge";

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
