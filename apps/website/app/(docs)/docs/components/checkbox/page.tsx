import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Checkbox";
const description =
  "Binary and indeterminate checkbox control with Base UI semantics, plus CheckboxGroup composition for preference sets.";
const href = "/docs/components/checkbox";

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
