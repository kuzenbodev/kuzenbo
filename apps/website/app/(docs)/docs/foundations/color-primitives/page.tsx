import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Color Primitives";
const description =
  "Define and evolve Kuzenbo color tokens through @kuzenbo/theme while keeping semantic class usage stable across packages.";
const href = "/docs/foundations/color-primitives";

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
