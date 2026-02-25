import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Forms";
const description =
  "Form composition patterns with canonical Form, Field, and Fieldset primitives, plus Kuzenbo input controls and validation flows.";
const href = "/docs/patterns/forms";

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
