import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Composition";
const description =
  "Compose Kuzenbo interfaces with explicit slots, render-prop polymorphism, and package-safe ownership boundaries.";
const href = "/docs/patterns/composition";

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
