import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "QR Code";
const description =
  "Client-side SVG QR generation in @kuzenbo/core with semantic theme defaults and configurable error correction.";
const href = "/docs/components/qr-code";

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
