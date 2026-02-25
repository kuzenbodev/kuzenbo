import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Autocomplete";
const description =
  "Build search-first suggestion UIs with @kuzenbo/core Autocomplete, including grouped options, async filtering, and status feedback.";
const href = "/docs/components/autocomplete";

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
