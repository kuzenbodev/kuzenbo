import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { Alert } from "./alert";

afterEach(cleanup);

describe("Alert", () => {
  it("renders children correctly", () => {
    render(
      <Alert>
        <Alert.Title>Title</Alert.Title>
        <Alert.Description>Description</Alert.Description>
      </Alert>
    );
    expect(screen.getByText("Title")).toBeDefined();
    expect(screen.getByText("Description")).toBeDefined();
  });

  it("has role alert", () => {
    render(<Alert>Message</Alert>);
    expect(screen.getByRole("alert")).toBeDefined();
  });

  it("has data-slot attribute", () => {
    render(<Alert>Test</Alert>);
    expect(document.querySelector("[data-slot=alert]")).toBeDefined();
  });

  it("preserves warning styling for default appearance", () => {
    render(<Alert variant="warning">Warning</Alert>);
    const alert = screen.getByRole("alert");
    const { className } = alert;

    expect(className.includes("border-warning-border")).toBe(true);
    expect(className.includes("bg-warning")).toBe(true);
    expect(className.includes("text-warning-foreground")).toBe(true);
  });

  it("supports primary and secondary variants", () => {
    const { rerender } = render(<Alert variant="primary">Primary</Alert>);
    let { className } = screen.getByRole("alert");
    expect(className.includes("bg-primary/10")).toBe(true);
    expect(className.includes("text-primary")).toBe(true);

    rerender(<Alert variant="secondary">Secondary</Alert>);
    ({ className } = screen.getByRole("alert"));
    expect(className.includes("bg-secondary")).toBe(true);
    expect(className.includes("text-secondary-foreground")).toBe(true);
  });

  it("supports subtle and outline appearances", () => {
    const { rerender } = render(
      <Alert appearance="subtle" variant="danger">
        Danger subtle
      </Alert>
    );
    let { className } = screen.getByRole("alert");
    expect(className.includes("bg-danger/60")).toBe(true);
    expect(className.includes("border-danger-border/70")).toBe(true);

    rerender(
      <Alert appearance="outline" variant="info">
        Info outline
      </Alert>
    );
    ({ className } = screen.getByRole("alert"));
    expect(className.includes("bg-background")).toBe(true);
    expect(className.includes("border-info-border")).toBe(true);
    expect(className.includes("text-info-foreground")).toBe(true);
  });

  it("supports inverted appearance for dark, colored alerts", () => {
    render(
      <Alert appearance="inverted" variant="success">
        Success inverted
      </Alert>
    );
    const { className } = screen.getByRole("alert");

    expect(className.includes("border-0")).toBe(true);
    expect(className.includes("bg-foreground")).toBe(true);
    expect(className.includes("text-background")).toBe(true);
    expect(className.includes("[&>svg]:text-success-foreground")).toBe(true);
  });

  it("supports xs-to-xl size scaling", () => {
    const { rerender } = render(<Alert size="xs">Compact</Alert>);
    let alert = screen.getByRole("alert");

    expect(alert.dataset.size).toBe("xs");
    expect(alert.className.includes("px-2.5")).toBe(true);
    expect(alert.className.includes("text-xs")).toBe(true);

    rerender(<Alert size="xl">Spacious</Alert>);
    alert = screen.getByRole("alert");

    expect(alert.dataset.size).toBe("xl");
    expect(alert.className.includes("px-6")).toBe(true);
    expect(alert.className.includes("text-base")).toBe(true);
  });
});
