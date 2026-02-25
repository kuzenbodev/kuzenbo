import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Styles Baseline";
const description =
  "How to apply @kuzenbo/styles/recommended.css as an optional app-level baseline.";
const href = "/docs/foundations/styles-baseline";

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
