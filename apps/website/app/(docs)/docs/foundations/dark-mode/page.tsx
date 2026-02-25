import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Dark Mode";
const description =
  "Implement dark mode in Next.js with @kuzenbo/theme bootstrap, provider wiring, and storage sync.";
const href = "/docs/foundations/dark-mode";

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
