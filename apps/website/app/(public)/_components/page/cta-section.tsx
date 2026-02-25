"use client";

import type { Route } from "next";

import { Button, Container, Typography } from "@kuzenbo/core";
import Link from "next/link";

export const CTASection = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

    <Container className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Typography.H2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Ready to build?
        </Typography.H2>
        <Typography.Lead className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Start building your design system today with Kuzenbo components. Ship
          faster with confidence.
        </Typography.Lead>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button
            nativeButton={false}
            render={<Link href={"/docs" as Route} />}
            size="lg"
          >
            Get Started
          </Button>
          <Button
            nativeButton={false}
            render={<Link href={"/showcase" as Route} />}
            size="lg"
            variant="outline"
          >
            Explore Showcase
          </Button>
        </div>

        <Typography.Caption className="mt-8 text-muted-foreground">
          Open source and free forever.
        </Typography.Caption>
      </div>
    </Container>
  </section>
);
