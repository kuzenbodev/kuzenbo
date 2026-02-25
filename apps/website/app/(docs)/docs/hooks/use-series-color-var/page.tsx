import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "useSeriesColorVar";
const description =
  "Resolve a CSS variable reference for a chart series key, with deterministic slug fallback for unknown keys.";
const href = "/docs/hooks/use-series-color-var";

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
