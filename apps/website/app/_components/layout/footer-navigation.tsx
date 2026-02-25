import type { FooterColumn } from "./footer.types";

import { FooterNavigationColumn } from "./footer-navigation-column";

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    title: "Getting Started",
    links: [
      { href: "/docs", label: "Docs Home" },
      { href: "/docs/getting-started", label: "Start Here" },
      { href: "/docs/getting-started/installation", label: "Installation" },
      { href: "/docs/getting-started/quickstart", label: "Quickstart" },
    ],
  },
  {
    title: "Library",
    links: [
      { href: "/docs/components", label: "Components" },
      { href: "/docs/hooks", label: "Hooks" },
      { href: "/docs", label: "All Docs" },
      { href: "/showcase/components", label: "Component Gallery" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/showcase", label: "Showcase" },
      { href: "/showcase/hooks", label: "Hooks Gallery" },
      { href: "/showcase/playground", label: "Playground" },
      { href: "/docs", label: "Browse Docs" },
    ],
  },
];

export const FooterNavigation = () => (
  <>
    {FOOTER_COLUMNS.map((column) => (
      <FooterNavigationColumn column={column} key={column.title} />
    ))}
  </>
);
