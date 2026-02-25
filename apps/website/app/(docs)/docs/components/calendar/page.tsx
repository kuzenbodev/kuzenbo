import { DocsMdxPage, createDocsPageMetadata } from "@/lib/docs/page-runtime";

import Content from "./content.mdx";

const title = "Calendar";
const description =
  "Use @kuzenbo/date Calendar for display-only and interactive date selection with single, range, locale, and week-number modes.";
const href = "/docs/components/calendar";

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
