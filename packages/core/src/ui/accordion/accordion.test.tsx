import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";

import { Accordion } from "./accordion";

afterEach(cleanup);

const ROOT_CLASS_NAME = () => "accordion-root-from-fn";
const ITEM_CLASS_NAME = () => "accordion-item-from-fn";
const HEADER_CLASS_NAME = () => "accordion-header-from-fn";
const TRIGGER_CLASS_NAME = () => "accordion-trigger-from-fn";
const CONTENT_CLASS_NAME = () => "accordion-content-from-fn";

const renderAccordion = (variant?: "default" | "bordered" | "ghost") => {
  render(
    <Accordion variant={variant}>
      <Accordion.Item value="1">
        <Accordion.Header>
          <Accordion.Trigger>Section 1</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>Content 1</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

describe("Accordion", () => {
  it("renders trigger", () => {
    renderAccordion();
    expect(screen.getByText("Section 1")).toBeDefined();
  });

  it("expands content on trigger click", async () => {
    const user = userEvent.setup();
    renderAccordion();
    await user.click(screen.getByText("Section 1"));
    expect(screen.getByText("Content 1")).toBeDefined();
  });

  it("has root slot and default variant contract", () => {
    renderAccordion();
    const root = document.querySelector<HTMLElement>("[data-slot=accordion]");
    expect(root).toBeDefined();
    expect(root?.dataset.variant).toBe("default");
    expect(root?.className.includes("group/accordion")).toBe(true);
  });

  it("uses md as the default size token and trigger height", () => {
    render(
      <Accordion defaultValue={["1"]}>
        <Accordion.Item value="1">
          <Accordion.Header>
            <Accordion.Trigger>Section 1</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=accordion]");
    const trigger = document.querySelector<HTMLElement>(
      "[data-slot=accordion-trigger]"
    );
    expect(root?.dataset.size).toBe("md");
    expect(trigger?.className.includes("min-h-10")).toBe(true);
  });

  it("cascades xl size to trigger and content spacing", () => {
    render(
      <Accordion defaultValue={["1"]} size="xl">
        <Accordion.Item value="1">
          <Accordion.Header>
            <Accordion.Trigger>Section 1</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    const trigger = document.querySelector<HTMLElement>(
      "[data-slot=accordion-trigger]"
    );
    const content = document.querySelector<HTMLElement>(
      "[data-slot=accordion-content]"
    );
    const contentBody = content?.firstElementChild;
    expect(trigger?.className.includes("min-h-12")).toBe(true);
    expect(trigger?.className.includes("text-base")).toBe(true);
    expect(contentBody?.className.includes("pb-6")).toBe(true);
  });

  it("supports compact xs ghost sizing for trigger and panel spacing", () => {
    render(
      <Accordion defaultValue={["1"]} size="xs" variant="ghost">
        <Accordion.Item value="1">
          <Accordion.Header>
            <Accordion.Trigger>Section 1</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    const trigger = document.querySelector<HTMLElement>(
      "[data-slot=accordion-trigger]"
    );
    const content = document.querySelector<HTMLElement>(
      "[data-slot=accordion-content]"
    );
    const contentBody = content?.firstElementChild;
    expect(trigger?.className.includes("min-h-8")).toBe(true);
    expect(trigger?.className.includes("px-2")).toBe(true);
    expect(contentBody?.className.includes("p-2")).toBe(true);
  });

  it("applies bordered root variant contract with item padding", () => {
    renderAccordion("bordered");
    const root = document.querySelector<HTMLElement>("[data-slot=accordion]");
    const item = document.querySelector<HTMLElement>(
      "[data-slot=accordion-item]"
    );
    expect(root?.dataset.variant).toBe("bordered");
    expect(root?.className.includes("rounded-lg")).toBe(true);
    expect(item?.className.includes("px-4")).toBe(true);
  });

  it("applies ghost variant styling via context", async () => {
    const user = userEvent.setup();
    renderAccordion("ghost");
    await user.click(screen.getByText("Section 1"));
    const item = document.querySelector<HTMLElement>(
      "[data-slot=accordion-item]"
    );
    const trigger = document.querySelector("[data-slot=accordion-trigger]");
    expect(item?.className.includes("px-4")).toBe(true);
    expect(trigger?.className.includes("hover:bg-muted/70")).toBe(true);
  });

  it("respects horizontal orientation root contract", () => {
    render(
      <Accordion defaultValue={["1"]} orientation="horizontal">
        <Accordion.Item value="1">
          <Accordion.Header>
            <Accordion.Trigger>Section 1</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=accordion]");
    const content = document.querySelector<HTMLElement>(
      "[data-slot=accordion-content]"
    );
    expect(root?.dataset.orientation).toBe("horizontal");
    expect(
      content?.className.includes(
        "data-[orientation=horizontal]:w-[var(--accordion-panel-width)]"
      )
    ).toBe(true);
  });

  it("passes hiddenUntilFound root behavior to panels", () => {
    render(
      <Accordion hiddenUntilFound>
        <Accordion.Item value="1">
          <Accordion.Header>
            <Accordion.Trigger>Section 1</Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>Content 1</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    const content = document.querySelector<HTMLElement>(
      "[data-slot=accordion-content]"
    );
    expect(content?.getAttribute("hidden")).toBe("until-found");
  });

  it("exposes Accordion.Header and preserves className callback support", () => {
    render(
      <Accordion className={ROOT_CLASS_NAME}>
        <Accordion.Item className={ITEM_CLASS_NAME} value="1">
          <Accordion.Header className={HEADER_CLASS_NAME}>
            <Accordion.Trigger className={TRIGGER_CLASS_NAME}>
              Section 1
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className={CONTENT_CLASS_NAME} keepMounted>
            Content 1
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=accordion]");
    const item = document.querySelector<HTMLElement>(
      "[data-slot=accordion-item]"
    );
    const header = document.querySelector<HTMLElement>(
      "[data-slot=accordion-header]"
    );
    const trigger = document.querySelector<HTMLElement>(
      "[data-slot=accordion-trigger]"
    );
    const content = document.querySelector<HTMLElement>(
      "[data-slot=accordion-content]"
    );

    expect(Accordion.Header).toBeDefined();
    expect(Accordion.Content).toBeDefined();
    expect(root?.className.includes("accordion-root-from-fn")).toBe(true);
    expect(item?.className.includes("accordion-item-from-fn")).toBe(true);
    expect(header?.className.includes("accordion-header-from-fn")).toBe(true);
    expect(trigger?.className.includes("accordion-trigger-from-fn")).toBe(true);
    expect(content?.className.includes("accordion-content-from-fn")).toBe(true);
  });
});
