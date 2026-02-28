"use client";

import { Alert, AlertDescription, AlertTitle } from "@kuzenbo/core/ui/alert";
import { Button } from "@kuzenbo/core/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@kuzenbo/core/ui/card";
import { Container } from "@kuzenbo/core/ui/container";
import { Typography } from "@kuzenbo/core/ui/typography";
import { useCallback, useState } from "react";

export const ShowcasePlaygroundClient = () => {
  const [alertVariant, setAlertVariant] = useState<
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info"
  >("default");
  const [alertAppearance, setAlertAppearance] = useState<
    "default" | "subtle" | "outline" | "inverted"
  >("default");
  const setDefault = useCallback(() => {
    setAlertVariant("default");
  }, []);
  const setPrimary = useCallback(() => {
    setAlertVariant("primary");
  }, []);
  const setSecondary = useCallback(() => {
    setAlertVariant("secondary");
  }, []);
  const setSuccess = useCallback(() => {
    setAlertVariant("success");
  }, []);
  const setWarning = useCallback(() => {
    setAlertVariant("warning");
  }, []);
  const setDanger = useCallback(() => {
    setAlertVariant("danger");
  }, []);
  const setInfo = useCallback(() => {
    setAlertVariant("info");
  }, []);
  const setAppearanceDefault = useCallback(() => {
    setAlertAppearance("default");
  }, []);
  const setAppearanceSubtle = useCallback(() => {
    setAlertAppearance("subtle");
  }, []);
  const setAppearanceOutline = useCallback(() => {
    setAlertAppearance("outline");
  }, []);
  const setAppearanceInverted = useCallback(() => {
    setAlertAppearance("inverted");
  }, []);

  return (
    <main className="min-h-screen">
      <Container className="space-y-8 py-10">
        <Typography.H1>Showcase: Playground</Typography.H1>
        <Typography.Muted>
          Interactive sandbox for quickly validating composition and variants.
        </Typography.Muted>

        <Card>
          <CardHeader>
            <CardTitle>Alert variant playground</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button onClick={setDefault} size="sm">
                Default
              </Button>
              <Button onClick={setPrimary} size="sm" variant="outline">
                Primary
              </Button>
              <Button onClick={setSecondary} size="sm" variant="outline">
                Secondary
              </Button>
              <Button onClick={setSuccess} size="sm" variant="outline">
                Success
              </Button>
              <Button onClick={setWarning} size="sm" variant="outline">
                Warning
              </Button>
              <Button onClick={setDanger} size="sm" variant="outline">
                Danger
              </Button>
              <Button onClick={setInfo} size="sm" variant="outline">
                Info
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={setAppearanceDefault} size="sm">
                Default appearance
              </Button>
              <Button onClick={setAppearanceSubtle} size="sm" variant="outline">
                Subtle
              </Button>
              <Button
                onClick={setAppearanceOutline}
                size="sm"
                variant="outline"
              >
                Outline
              </Button>
              <Button
                onClick={setAppearanceInverted}
                size="sm"
                variant="outline"
              >
                Inverted
              </Button>
            </div>

            <Alert appearance={alertAppearance} variant={alertVariant}>
              <AlertTitle>Playground variant</AlertTitle>
              <AlertDescription>
                Current value:{" "}
                <code>{`variant="${alertVariant}" appearance="${alertAppearance}"`}</code>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
};
