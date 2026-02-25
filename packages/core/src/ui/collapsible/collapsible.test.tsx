import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it, mock } from "bun:test";
import { useState } from "react";

import { Collapsible } from "./collapsible";

afterEach(cleanup);

const ROOT_CLASS_NAME = () => "collapsible-root-from-fn";
const TRIGGER_CLASS_NAME = () => "collapsible-trigger-from-fn";
const CONTENT_CLASS_NAME = () => "collapsible-content-from-fn";

const ControlledCollapsible = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Collapsible onOpenChange={setOpen} open={open}>
      <Collapsible.Trigger>Toggle</Collapsible.Trigger>
      <Collapsible.Content>Controlled content</Collapsible.Content>
    </Collapsible>
  );
};

describe("Collapsible", () => {
  it("renders a trigger in the default collapsed state", () => {
    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Collapsed content</Collapsible.Content>
      </Collapsible>
    );

    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Collapsed content")).toBeNull();
  });

  it("exposes root data-slot for styling contract coverage", () => {
    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Content</Collapsible.Content>
      </Collapsible>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=collapsible]");
    expect(root).not.toBeNull();
    expect(root?.dataset.slot).toBe("collapsible");
  });

  it("toggles panel open and closed in uncontrolled mode", async () => {
    const user = userEvent.setup();

    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Uncontrolled content</Collapsible.Content>
      </Collapsible>
    );

    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Uncontrolled content")).toBeNull();

    await user.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Uncontrolled content")).toBeDefined();

    await user.click(trigger);
    await waitFor(() => {
      expect(screen.queryByText("Uncontrolled content")).toBeNull();
    });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("starts expanded with defaultOpen and marks trigger with data-panel-open", async () => {
    render(
      <Collapsible defaultOpen>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Default open content</Collapsible.Content>
      </Collapsible>
    );

    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    await waitFor(() => {
      expect("panelOpen" in trigger.dataset).toBe(true);
    });
    expect(screen.getByText("Default open content")).toBeDefined();
  });

  it("calls onOpenChange in controlled mode without changing closed render state", async () => {
    const user = userEvent.setup();
    let nextOpenState = false;
    const onOpenChange = mock((open: boolean) => {
      nextOpenState = open;
    });

    render(
      <Collapsible onOpenChange={onOpenChange} open={false}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Controlled callback content</Collapsible.Content>
      </Collapsible>
    );

    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Controlled callback content")).toBeNull();

    await user.click(trigger);

    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(nextOpenState).toBe(true);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Controlled callback content")).toBeNull();
  });

  it("toggles panel through controlled local state updates", async () => {
    const user = userEvent.setup();

    render(<ControlledCollapsible />);

    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Controlled content")).toBeNull();

    await user.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Controlled content")).toBeDefined();

    await user.click(trigger);
    await waitFor(() => {
      expect(screen.queryByText("Controlled content")).toBeNull();
    });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("does not open or call onOpenChange when disabled", async () => {
    const user = userEvent.setup();
    const onOpenChange = mock();

    render(
      <Collapsible disabled onOpenChange={onOpenChange}>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content>Disabled content</Collapsible.Content>
      </Collapsible>
    );

    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger.getAttribute("aria-disabled")).toBe("true");
    expect(trigger.getAttribute("aria-expanded")).toBe("false");

    await user.click(trigger);

    expect(onOpenChange).toHaveBeenCalledTimes(0);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Disabled content")).toBeNull();
  });

  it("keeps a closed panel mounted with keepMounted and opens it on click", async () => {
    const user = userEvent.setup();

    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content keepMounted>
          Keep mounted content
        </Collapsible.Content>
      </Collapsible>
    );

    const trigger = screen.getByRole("button", { name: "Toggle" });
    const panel = screen.getByText("Keep mounted content");

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(panel.getAttribute("hidden")).toBe("");

    await user.click(trigger);

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(panel.getAttribute("hidden")).toBeNull();
  });

  it("retains a closed panel as hidden until found when hiddenUntilFound is enabled", () => {
    render(
      <Collapsible>
        <Collapsible.Trigger>Toggle</Collapsible.Trigger>
        <Collapsible.Content hiddenUntilFound keepMounted={false}>
          Hidden until found content
        </Collapsible.Content>
      </Collapsible>
    );

    const trigger = screen.getByRole("button", { name: "Toggle" });
    const panel = screen.getByText("Hidden until found content");

    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(panel.getAttribute("hidden")).toBe("until-found");
  });

  it("preserves className callback support for root, trigger, and content", () => {
    render(
      <Collapsible className={ROOT_CLASS_NAME}>
        <Collapsible.Trigger className={TRIGGER_CLASS_NAME}>
          Toggle
        </Collapsible.Trigger>
        <Collapsible.Panel className={CONTENT_CLASS_NAME} keepMounted>
          Callback content
        </Collapsible.Panel>
      </Collapsible>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=collapsible]");
    const trigger = document.querySelector<HTMLElement>(
      "[data-slot=collapsible-trigger]"
    );
    const content = document.querySelector<HTMLElement>(
      "[data-slot=collapsible-content]"
    );

    expect(root?.className.includes("collapsible-root-from-fn")).toBe(true);
    expect(trigger?.className.includes("collapsible-trigger-from-fn")).toBe(
      true
    );
    expect(content?.className.includes("collapsible-content-from-fn")).toBe(
      true
    );
    expect(Collapsible.Panel).toBeDefined();
  });
});
