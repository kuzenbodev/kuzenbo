import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Theme Runtime";
const description =
  "Reference for @kuzenbo/theme runtime APIs, bootstrap behavior, and persistence strategy.";
const href = "/docs/foundations/theme-runtime";

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
