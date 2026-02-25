import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Range Slider";
const description =
  "Use @kuzenbo/core RangeSlider for two-thumb tuple range selection with marks, constraints, and orientation support.";
const href = "/docs/components/range-slider";

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
