import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Dropzone";
const description =
  "Handle drag-and-drop file intake with @kuzenbo/core Dropzone, including accept/reject states, validation limits, and programmatic open control.";
const href = "/docs/components/dropzone";

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
