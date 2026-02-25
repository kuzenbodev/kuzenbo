import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Carousel";
const description =
  "Build swipeable or keyboard-driven slide sequences with @kuzenbo/core Carousel and Embla-backed controls.";
const href = "/docs/components/carousel";

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
