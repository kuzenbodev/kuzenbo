import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "AI Prompting";
const description =
  "Practical prompting patterns for @kuzenbo/ai using buildAiPrompt, useAiSession, and AiWidget.";
const href = "/docs/foundations/ai-prompting";

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
