import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Layout and Spacing";
const description =
  "Practical layout composition with @kuzenbo/core primitives such as Container, Card, Separator, Spacer, and AspectRatio.";
const href = "/docs/foundations/layout-and-spacing";

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
