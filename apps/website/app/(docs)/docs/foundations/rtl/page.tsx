import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "RTL";
const description =
  "Ship reliable right-to-left experiences in Kuzenbo by combining document direction, logical layout decisions, and component-level verification.";
const href = "/docs/foundations/rtl";

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
