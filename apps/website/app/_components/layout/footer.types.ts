import type { Route } from "next";

export interface FooterLink {
  href: Route;
  label: string;
}

export interface FooterColumn {
  links: readonly FooterLink[];
  title: string;
}
