import { Container, Separator } from "@kuzenbo/core";

import { FooterBottom } from "./footer-bottom";
import { FooterBrand } from "./footer-brand";
import { FooterNavigation } from "./footer-navigation";

export const Footer = () => (
  <footer className="border-t border-border bg-gradient-to-b from-background via-background to-muted/30">
    <Container className="border-x px-0">
      <div className="grid gap-10 py-10 px-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <FooterBrand />
        <FooterNavigation />
      </div>

      <Separator />

      <FooterBottom />
    </Container>
  </footer>
);
