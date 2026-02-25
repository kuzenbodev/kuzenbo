"use client";

import type { Route } from "next";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  Typography,
} from "@kuzenbo/core";
import {
  useFullscreen,
  useIsMobile,
  useIsomorphicEffect,
} from "@kuzenbo/hooks";
import Link from "next/link";
import { useCallback, useState } from "react";

export const ShowcaseHooksClient = () => {
  const isMobile = useIsMobile();
  const [count, setCount] = useState(0);
  const [effectRuns, setEffectRuns] = useState(0);
  const { ref, toggle, fullscreen } = useFullscreen<HTMLDivElement>();

  useIsomorphicEffect(() => {
    setEffectRuns((value) => value + 1);
  }, [count]);

  const handleIncrement = useCallback(() => {
    setCount((value) => value + 1);
  }, []);

  const handleToggle = useCallback(async () => {
    try {
      await toggle();
    } catch {
      // Browsers can block fullscreen without explicit user gesture context.
    }
  }, [toggle]);

  return (
    <main className="min-h-screen  ">
      <Container className="space-y-8 py-10">
        <Typography.H1>Showcase: Hooks</Typography.H1>
        <Typography.Muted>
          Small live demos for hooks used across publishable packages.
        </Typography.Muted>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>useIsMobile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Current viewport classification:</p>
              <Typography.P className="">
                {isMobile ? "Mobile" : "Desktop"}
              </Typography.P>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>useIsomorphicEffect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>Effect run count: {effectRuns}</p>
              <Button onClick={handleIncrement} size="sm">
                Increment ({count})
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>useFullscreen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div
                className="flex min-h-24 items-center justify-center rounded-md border border-border bg-muted"
                ref={ref}
              >
                {fullscreen ? "Fullscreen active" : "Inline panel"}
              </div>
              <Button onClick={handleToggle} size="sm" variant="outline">
                {fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="flex flex-wrap gap-2">
          <Button
            nativeButton={false}
            render={<Link href={"/docs/hooks" as Route} />}
            variant="outline"
          >
            Browse hooks docs
          </Button>
          <Button
            nativeButton={false}
            render={<Link href={"/showcase/playground" as Route} />}
            variant="ghost"
          >
            Try playground
          </Button>
        </section>
      </Container>
    </main>
  );
};
