import { DocsTocMock } from "./docs-toc-mock";

export const DocsSidebarToc = () => (
  <aside className="sticky top-[var(--kb-anchor-offset)] hidden self-start border-l py-4 pl-4 xl:block">
    <DocsTocMock />
  </aside>
);
