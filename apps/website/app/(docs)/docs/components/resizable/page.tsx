import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Resizable";
const description =
  "Compose split layouts with @kuzenbo/core ResizablePanelGroup, ResizablePanel, and ResizableHandle for editor- and dashboard-style UIs.";
const href = "/docs/components/resizable";

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
