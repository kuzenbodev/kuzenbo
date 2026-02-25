import type { ComponentProps } from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";
import { createElement } from "react";

import { Typography } from "./typography";

const renderHeadingAsH1: NonNullable<
  ComponentProps<typeof Typography.Heading>["render"]
> = (props) =>
  createElement("h1", { ...props, "data-testid": "heading-render" });

afterEach(cleanup);

describe("Typography", () => {
  it("renders Typography.Link as anchor with href", () => {
    render(<Typography.Link href="/docs">Docs link</Typography.Link>);

    const link = screen.getByText("Docs link");

    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("/docs");
    expect(link.dataset.slot).toBe("typography-link");
  });

  it("renders expected default semantic tags", () => {
    render(
      <>
        <Typography.H1>Heading 1</Typography.H1>
        <Typography.P>Paragraph</Typography.P>
        <Typography.Blockquote>Quote</Typography.Blockquote>
        <Typography.Ul>
          <Typography.Li>Bullet item</Typography.Li>
        </Typography.Ul>
        <Typography.Ol>
          <Typography.Li>Ordered item</Typography.Li>
        </Typography.Ol>
      </>
    );

    expect(screen.getByText("Heading 1").tagName).toBe("H1");
    expect(screen.getByText("Paragraph").tagName).toBe("P");
    expect(screen.getByText("Quote").tagName).toBe("BLOCKQUOTE");
    expect(screen.getByText("Bullet item").closest("ul")?.tagName).toBe("UL");
    expect(screen.getByText("Ordered item").closest("ol")?.tagName).toBe("OL");
  });

  it("does not expose removed code alias", () => {
    expect(Object.hasOwn(Typography, "Code")).toBe(false);
  });

  it("supports polymorphic render prop for text and heading", () => {
    render(
      <>
        <Typography.Text render={<span data-testid="text-render" />}>
          Text Render
        </Typography.Text>
        <Typography.Heading render={renderHeadingAsH1}>
          Heading Render
        </Typography.Heading>
      </>
    );

    expect(screen.getByTestId("text-render").tagName).toBe("SPAN");
    expect(screen.getByTestId("heading-render").tagName).toBe("H1");
  });

  it("applies data-slot and data-variant on base primitives", () => {
    render(
      <>
        <Typography.Text variant="muted">Muted text</Typography.Text>
        <Typography.Heading variant="h4">Heading text</Typography.Heading>
      </>
    );

    const text = screen.getByText("Muted text");
    const heading = screen.getByText("Heading text");

    expect(text.dataset.slot).toBe("typography-text");
    expect(text.dataset.variant).toBe("muted");
    expect(heading.dataset.slot).toBe("typography-heading");
    expect(heading.dataset.variant).toBe("h4");
  });

  it("maps aliases to the same canonical variants", () => {
    render(
      <>
        <Typography.Muted data-testid="alias-muted">
          Alias muted
        </Typography.Muted>
        <Typography.Text data-testid="canonical-muted" variant="muted">
          Canonical muted
        </Typography.Text>
        <Typography.Display data-testid="alias-display">
          Alias display
        </Typography.Display>
        <Typography.Heading data-testid="canonical-display" variant="display">
          Canonical display
        </Typography.Heading>
      </>
    );

    const aliasMuted = screen.getByTestId("alias-muted");
    const canonicalMuted = screen.getByTestId("canonical-muted");
    const aliasDisplay = screen.getByTestId("alias-display");
    const canonicalDisplay = screen.getByTestId("canonical-display");

    expect(aliasMuted.dataset.variant).toBe(canonicalMuted.dataset.variant);
    expect(aliasDisplay.dataset.variant).toBe(canonicalDisplay.dataset.variant);
    expect(aliasDisplay.tagName).toBe("H1");
  });

  it("renders block-level default tags for compact text aliases", () => {
    render(
      <>
        <Typography.Small>Small alias</Typography.Small>
        <Typography.Caption>Caption alias</Typography.Caption>
        <Typography.Overline>Overline alias</Typography.Overline>
        <Typography.Eyebrow>Eyebrow alias</Typography.Eyebrow>
      </>
    );

    expect(screen.getByText("Small alias").tagName).toBe("P");
    expect(screen.getByText("Caption alias").tagName).toBe("P");
    expect(screen.getByText("Overline alias").tagName).toBe("P");
    expect(screen.getByText("Eyebrow alias").tagName).toBe("P");
  });

  it("merges custom classes without dropping base classes", () => {
    render(
      <Typography.Text className="custom-class">Class test</Typography.Text>
    );

    const element = screen.getByText("Class test");

    expect(element.className.includes("custom-class")).toBe(true);
    expect(element.className.includes("text-base")).toBe(true);
  });
});
