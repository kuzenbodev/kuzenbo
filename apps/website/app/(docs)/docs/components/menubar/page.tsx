import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Menubar";
const description =
  "Build application-style top menus with @kuzenbo/core Menubar, including groups, radio and checkbox items, and nested submenus.";
const href = "/docs/components/menubar";

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
