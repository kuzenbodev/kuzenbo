import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Toggle";
const description =
  "Build pressed-state controls and grouped selection patterns with Toggle and ToggleGroup from @kuzenbo/core.";
const href = "/docs/components/toggle";

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
