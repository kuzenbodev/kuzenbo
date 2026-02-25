import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Toolbar";
const description =
  "Composable action toolbar with grouped controls, separators, link/input slots, and button variant integration.";
const href = "/docs/components/toolbar";

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
