"use client";

import { Alert, AlertDescription, AlertTitle } from "@kuzenbo/core/ui/alert";
import { Badge } from "@kuzenbo/core/ui/badge";
import { Button } from "@kuzenbo/core/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@kuzenbo/core/ui/card";
import { Container } from "@kuzenbo/core/ui/container";
import { Input } from "@kuzenbo/core/ui/input";
import { Label } from "@kuzenbo/core/ui/label";
import { Typography } from "@kuzenbo/core/ui/typography";
import Link from "next/link";

export const ShowcaseComponentsClient = () => (
  <main className="min-h-screen">
    <Container className="space-y-8 py-10">
      <Typography.H1>Showcase: Components</Typography.H1>
      <Typography.Muted>
        Live component compositions you can use as a quick implementation
        reference.
      </Typography.Muted>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Form controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="showcase-email">Email</Label>
              <Input id="showcase-email" placeholder="team@kuzenbo.com" />
            </div>
            <div className="flex gap-2">
              <Button size="sm">Invite</Button>
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feedback states</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Alert variant="info">
              <AlertTitle>Deployment queued</AlertTitle>
              <AlertDescription>
                Your release is waiting for quality checks to finish.
              </AlertDescription>
            </Alert>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">Healthy</Badge>
              <Badge variant="warning">Monitoring</Badge>
              <Badge variant="danger">Needs attention</Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-wrap gap-2">
        <Button
          nativeButton={false}
          render={<Link href="/docs/components" />}
          variant="outline"
        >
          Browse component docs
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/showcase/playground" />}
          variant="ghost"
        >
          Open playground
        </Button>
      </section>
    </Container>
  </main>
);
