export interface FooterLink {
  href: string;
  label: string;
}

export interface FooterColumn {
  links: readonly FooterLink[];
  title: string;
}
