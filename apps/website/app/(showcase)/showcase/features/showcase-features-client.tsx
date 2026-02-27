"use client";

import { AiWidget } from "@kuzenbo/ai/ui/ai-widget";
import { Button } from "@kuzenbo/core/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@kuzenbo/core/ui/card";
import { Container } from "@kuzenbo/core/ui/container";
import { Typography } from "@kuzenbo/core/ui/typography";
import Link from "next/link";

interface ReleaseRow {
  package: string;
  status: "ready" | "needs-docs" | "blocked";
}

const releaseRows: ReleaseRow[] = [
  { package: "@kuzenbo/core", status: "ready" },
  { package: "@kuzenbo/charts", status: "ready" },
  { package: "@kuzenbo/date", status: "ready" },
  { package: "@kuzenbo/tiptap", status: "blocked" },
];

export const ShowcaseFeaturesClient = () => (
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
          render={<Link href="/docs/components/ai-widget" />}
          variant="outline"
        >
          AI widget docs
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/docs/components/calendar" />}
          variant="outline"
        >
          Calendar docs
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/docs/components/mock-data-table" />}
          variant="outline"
        >
          Datatable docs
        </Button>
      </section>
    </Container>
  </main>
);
