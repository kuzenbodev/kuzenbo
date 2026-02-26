import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "useClipboard";
const description =
  "Copy text with status lifecycle and accessibility announcements.";
const href = "/docs/hooks/use-clipboard";

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
