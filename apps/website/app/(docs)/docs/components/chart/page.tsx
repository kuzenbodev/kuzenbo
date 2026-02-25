import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Chart";
const description =
  "Low-level chart primitives in @kuzenbo/charts for composing Recharts with shared config, legend, tooltip, and style behavior.";
const href = "/docs/components/chart";

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
