import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Theme Icon";
const description =
  "Use @kuzenbo/core ThemeIcon for icon containers with semantic variant tokens, size controls, and render-prop element composition.";
const href = "/docs/components/theme-icon";

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
