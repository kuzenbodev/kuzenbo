import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "useOffset";
const description =
  "Read chart offset (top, right, bottom, left) from Recharts to place custom layers relative to the plot area.";
const href = "/docs/hooks/use-offset";

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
