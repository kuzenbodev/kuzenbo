import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Dropdown Menu (Legacy Alias)";
const description =
  "Legacy route for the former DropdownMenu API. Use Menu as the canonical surface.";
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
