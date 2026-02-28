import { Container } from "@kuzenbo/core/ui/container";
import { Separator } from "@kuzenbo/core/ui/separator";

import { FooterBottom } from "./footer-bottom";
import { FooterBrand } from "./footer-brand";
import { FooterNavigation } from "./footer-navigation";

export const Footer = () => (
  <footer className="border-border from-background via-background to-muted/30 border-t bg-gradient-to-b">
    <Container className="border-x px-0">
      <div className="grid gap-10 px-4 py-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <FooterBrand />
        <FooterNavigation />
      </div>

      <Separator />

      <FooterBottom />
    </Container>
  </footer>
);
