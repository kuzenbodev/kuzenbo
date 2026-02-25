import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "useFullscreen";
const description =
  "Toggle element or document fullscreen with cross-browser fallbacks, reactive fullscreen state, and cleanup-safe event handling.";
const href = "/docs/hooks/use-fullscreen";

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
