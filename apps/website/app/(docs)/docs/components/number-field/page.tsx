import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Number Field";
const description =
  "Compose numeric inputs with steppers, scrub controls, and min/max boundaries using @kuzenbo/core NumberField.";
const href = "/docs/components/number-field";

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
