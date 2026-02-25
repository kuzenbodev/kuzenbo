"use client";

import type { Route } from "next";

import { Button, Typography } from "@kuzenbo/core";
import Link from "next/link";

export const HeroSection = () => (
  <>
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-3xl" />
    </div>
    <section className="relative mx-auto max-w-5xl px-4 py-12 text-center">
      <Typography.H1 className="mt-8 text-4xl font-bold tracking-tight  sm:text-6xl">
        Build your design system
        <br />
        <span className="text-primary">with Kuzenbo</span>
      </Typography.H1>

      <Typography.Lead className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
        Composable React primitives and polished components that help your team
        ship consistent interfaces faster. Built on Base UI with full control
        over styling, behavior, and accessibility.
      </Typography.Lead>

      <div className="mt-10 grid grid-cols-2 max-w-xs mx-auto w-full items-center justify-center gap-4">
        <Button
          nativeButton={false}
          render={<Link href={"/docs" as Route} />}
          size="xl"
        >
          Get Started
        </Button>
        <Button
          nativeButton={false}
          render={<Link href={"/showcase" as Route} />}
          size="xl"
          variant="outline"
        >
          View Showcase
        </Button>
      </div>
    </section>
  </>
);
