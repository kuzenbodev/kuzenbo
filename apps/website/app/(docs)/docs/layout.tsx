import type { ReactNode } from "react";

import { DocsLayoutChrome } from "./_components/docs-layout-chrome.client";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <DocsLayoutChrome>{children}</DocsLayoutChrome>;
}
