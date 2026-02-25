import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Context Menu";
const description =
  "Right-click and context-action menus in @kuzenbo/core with groups, check/radio items, and nested submenus.";
const href = "/docs/components/context-menu";

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
