import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "AI Widget";
const description =
  "Build lightweight assistant surfaces with @kuzenbo/ai AiWidget, including title handling, composition guidance, and runtime boundaries.";
const href = "/docs/components/ai-widget";

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
