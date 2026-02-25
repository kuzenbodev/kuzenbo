import type { Route } from "next";

import { AiWidget } from "@kuzenbo/ai";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Container,
  Typography,
} from "@kuzenbo/core";
import Link from "next/link";

import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Showcase Features",
  description:
    "Explore feature-level user flows and system narratives built with Kuzenbo primitives.",
  canonicalPath: "/showcase/features",
  openGraphImagePath: "/opengraph-image",
  twitterImagePath: "/twitter-image",
});

interface ReleaseRow {
  package: string;
  status: "ready" | "needs-docs" | "blocked";
}

const releaseRows: ReleaseRow[] = [
  { package: "@kuzenbo/core", status: "ready" },
  { package: "@kuzenbo/charts", status: "ready" },
  { package: "@kuzenbo/date", status: "needs-docs" },
  { package: "@kuzenbo/tiptap", status: "blocked" },
];

export default function ShowcaseFeaturesPage() {
  return (
    <main className="min-h-screen  ">
      <Container className="space-y-8 py-10">
        <Typography.H1>Showcase: Features</Typography.H1>
        <Typography.Muted>
          Feature-level compositions across multiple Kuzenbo packages.
        </Typography.Muted>

        <section className="grid gap-4 xl:grid-cols-3">
          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle>AI + guidance panel</CardTitle>
            </CardHeader>
            <CardContent>
              <AiWidget title="Release assistant">
                Keep docs and tests in sync before requesting review.
              </AiWidget>
            </CardContent>
          </Card>

          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle>Date planning flow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Use `@kuzenbo/date` for single/range planning interfaces.</p>
              <p>Pair calendar surfaces with semantic token styling.</p>
            </CardContent>
          </Card>

          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle>Release status snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {releaseRows.map((row) => (
                <div
                  className="flex items-center justify-between rounded-md border border-border bg-muted/40 px-3 py-2 text-sm"
                  key={row.package}
                >
                  <span>{row.package}</span>
                  <span className="text-muted-foreground">{row.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="flex flex-wrap gap-2">
          <Button
            nativeButton={false}
            render={<Link href={"/docs/components/ai-widget" as Route} />}
            variant="outline"
          >
            AI widget docs
          </Button>
          <Button
            nativeButton={false}
            render={<Link href={"/docs/components/calendar" as Route} />}
            variant="outline"
          >
            Calendar docs
          </Button>
          <Button
            nativeButton={false}
            render={<Link href={"/docs/components/mock-data-table" as Route} />}
            variant="outline"
          >
            Datatable docs
          </Button>
        </section>
      </Container>
    </main>
  );
}
