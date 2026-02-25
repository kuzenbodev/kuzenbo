import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "useActiveTooltipCoordinate";
const description =
  "Read the active tooltip x/y coordinate from Recharts chart state so custom overlays can follow pointer interaction.";
const href = "/docs/hooks/use-active-tooltip-coordinate";

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
