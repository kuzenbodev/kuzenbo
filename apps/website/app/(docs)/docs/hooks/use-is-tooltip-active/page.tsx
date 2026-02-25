import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "useIsTooltipActive";
const description =
  "Read whether the Recharts tooltip is currently active for the current chart interaction state.";
const href = "/docs/hooks/use-is-tooltip-active";

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
