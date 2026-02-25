import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Sidebar";
const description =
  "Build responsive app-shell navigation with provider state, desktop collapse modes, and mobile sheet behavior.";
const href = "/docs/components/sidebar";

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
