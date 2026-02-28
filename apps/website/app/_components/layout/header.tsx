import { Container } from "@kuzenbo/core/ui/container";
import { Input } from "@kuzenbo/core/ui/input";
import { Separator } from "@kuzenbo/core/ui/separator";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

import { HeaderNavigation } from "./header-navigation";

export const Header = () => (
  <header className="z-overlay bg-background sticky top-0 flex h-14 items-center border-b">
    <Container className="flex h-full items-center justify-between gap-4 border-x">
      <div className="flex items-center gap-6">
        <Link className="flex items-center gap-2" href="/">
          <span className="border-border/70 bg-foreground text-background inline-flex size-5 items-center justify-center rounded-sm border text-xs font-semibold">
            K
          </span>
          <span className="text-sm font-semibold tracking-tight">Kuzenbo</span>
        </Link>
        <HeaderNavigation />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden w-72 lg:block">
          <Input placeholder="Search documentation..." />
        </div>

        <Separator className="my-2" orientation="vertical" />

        <ThemeToggle />
      </div>
    </Container>
  </header>
);
