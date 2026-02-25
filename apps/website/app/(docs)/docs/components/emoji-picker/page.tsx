import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Emoji Picker";
const description =
  "Compose searchable emoji selection UIs with list, search, empty/loading, and skin-tone controls.";
const href = "/docs/components/emoji-picker";

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
