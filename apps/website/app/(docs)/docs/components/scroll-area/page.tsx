import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Scroll Area";
const description =
  "Use ScrollArea from @kuzenbo/core to add consistent custom scrollbars and viewport focus behavior around overflow content.";
const href = "/docs/components/scroll-area";

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
