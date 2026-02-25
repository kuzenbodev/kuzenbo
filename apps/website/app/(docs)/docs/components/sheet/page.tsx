import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Sheet";
const description =
  "Dialog-based side panel with trigger, content, overlay, and side-aware layout controls for workflows and settings panels.";
const href = "/docs/components/sheet";

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
