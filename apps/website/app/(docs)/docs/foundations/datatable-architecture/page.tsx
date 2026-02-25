import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Datatable Architecture";
const description =
  "Architecture guidance for @kuzenbo/datatable and how to extend its current public surface safely.";
const href = "/docs/foundations/datatable-architecture";

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
