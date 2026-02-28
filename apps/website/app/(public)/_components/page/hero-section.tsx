"use client";

import { Button } from "@kuzenbo/core/ui/button";
import { Typography } from "@kuzenbo/core/ui/typography";
import Link from "next/link";

export const HeroSection = () => (
  <>
    <div className="z-underlay absolute inset-0 overflow-hidden">
      <div className="from-primary/20 via-primary/5 absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 bg-gradient-to-b to-transparent blur-3xl" />
    </div>
    <section className="relative mx-auto max-w-5xl px-4 py-12 text-center">
      <Typography.H1 className="mt-8 text-4xl font-bold tracking-tight sm:text-6xl">
        Build your design system
        <br />
        <span className="text-primary">with Kuzenbo</span>
      </Typography.H1>

      <Typography.Lead className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg sm:text-xl">
        Composable React primitives and polished components that help your team
        ship consistent interfaces faster. Built on Base UI with full control
        over styling, behavior, and accessibility.
      </Typography.Lead>

      <div className="mx-auto mt-10 grid w-full max-w-xs grid-cols-2 items-center justify-center gap-4">
        <Button nativeButton={false} render={<Link href="/docs" />} size="xl">
          Get Started
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/showcase" />}
          size="xl"
          variant="outline"
        >
          View Showcase
        </Button>
      </div>
    </section>
  </>
);
