import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "useChartPortalTarget";
const description =
  "Create a portal mount target for chart overlays with a ref callback and nullable HTMLElement state.";
const href = "/docs/hooks/use-chart-portal-target";

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
