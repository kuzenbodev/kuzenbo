import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "useActiveTooltipDataPoints";
const description =
  "Read the currently active tooltip payload objects from Recharts state during chart interaction.";
const href = "/docs/hooks/use-active-tooltip-data-points";

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
