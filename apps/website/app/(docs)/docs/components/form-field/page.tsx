import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Form Field (Previous Alias)";
const description =
  "Previous route for the former FormField API. Use Form, Field, and Fieldset as canonical primitives.";
const href = "/docs/components/form-field";

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
