import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Toast";
const description =
  "Deliver transient notifications with @kuzenbo/notifications Toast primitives, provider wiring, and useToast helpers.";
const href = "/docs/components/toast";

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
