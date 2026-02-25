import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Input Group";
const description =
  "Compose text fields, addons, buttons, and textarea controls with @kuzenbo/core Input Group for structured form input layouts.";
const href = "/docs/components/input-group";

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
