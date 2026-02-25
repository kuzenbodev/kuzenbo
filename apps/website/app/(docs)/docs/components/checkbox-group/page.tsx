import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Checkbox Group";
const description =
  "Compose multiple checkbox choices with shared state and labeling using @kuzenbo/core CheckboxGroup.";
const href = "/docs/components/checkbox-group";

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
