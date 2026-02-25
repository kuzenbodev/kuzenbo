import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Alert Dialog";
const description =
  "Confirmation-focused modal dialogs in @kuzenbo/core for destructive or irreversible actions.";
const href = "/docs/components/alert-dialog";

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
