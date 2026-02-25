import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "useActiveTooltipLabel";
const description =
  "Read the active tooltip label from Recharts interaction state to drive custom headers, badges, or synchronized UI.";
const href = "/docs/hooks/use-active-tooltip-label";

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
