import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Mock Data Table";
const description =
  "Render typed demo tables quickly with @kuzenbo/datatable MockDataTable and TanStack column definitions.";
const href = "/docs/components/mock-data-table";

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
