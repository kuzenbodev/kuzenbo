import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Fieldset";
const description =
  "Group related controls with Fieldset primitives in @kuzenbo/core for accessible legends and section-level structure.";
const href = "/docs/components/fieldset";

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
