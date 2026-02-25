import type { Route } from "next";

import { Button, Container, Typography } from "@kuzenbo/core";
import Link from "next/link";

import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Showcase",
  description:
    "Browse showcase routes for Kuzenbo components, hooks, features, and interactive playground scenarios.",
  canonicalPath: "/showcase",
  openGraphImagePath: "/opengraph-image",
  twitterImagePath: "/twitter-image",
});

export default function ShowcaseIndexPage() {
  return (
    <main className="min-h-screen">
      <Container className="space-y-6 py-10">
        <Typography.H1>Kuzenbo Showcase</Typography.H1>
        <Typography.Muted className="max-w-3xl">
          Explore focused showcase routes for components, hooks, and key feature
          scenarios.
        </Typography.Muted>
        <nav className="flex flex-wrap gap-3 text-sm">
          <Button
            nativeButton={false}
            render={<Link href="/showcase/components" />}
            variant="link"
          >
            Components
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/showcase/hooks" />}
            variant="link"
          >
            Hooks
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/showcase/features" />}
            variant="link"
          >
            Features
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/showcase/playground" />}
            variant="link"
          >
            Playground
          </Button>
          <Button
            nativeButton={false}
            render={<Link href={"/docs" as Route} />}
            variant="link"
          >
            Documentation
          </Button>
        </nav>
      </Container>
    </main>
  );
}
