import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "useIsomorphicEffect";
const description =
  "Run layout effects in the browser and automatically fall back to useEffect when document is unavailable.";
const href = "/docs/hooks/use-isomorphic-effect";

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
