import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Dropdown Menu (Previous Route)";
const description =
  "Previous docs route kept for compatibility. Use the canonical Dropdown Menu page.";
const href = "/docs/components/dropdown-menu";

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
