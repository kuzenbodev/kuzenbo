/* eslint-disable func-style */
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";

import { Select } from "./select";

afterEach(cleanup);

function triggerCallbackClassName() {
  return "trigger-callback";
}
function itemCallbackClassName() {
  return "item-callback";
}
function popupCallbackClassName() {
  return "popup-callback";
}
function getRequiredTriggerWrapper() {
  const trigger = screen.getByRole("combobox");
  const triggerWrapper = trigger.closest<HTMLElement>(
    "[data-slot=select-trigger]"
  );

  if (!triggerWrapper) {
    throw new Error("Expected select trigger wrapper to render");
  }

  return triggerWrapper;
}

describe("Select", () => {
  it("renders trigger with placeholder", () => {
    render(
      <Select>
        <Select.Trigger>
          <Select.Value placeholder="Choose option" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="a">Option A</Select.Item>
          <Select.Item value="b">Option B</Select.Item>
        </Select.Content>
      </Select>
    );
    expect(screen.getByText("Choose option")).toBeDefined();
  });

  it("opens and shows options on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <Select.Trigger>
          <Select.Value placeholder="Choose" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="a">Option A</Select.Item>
          <Select.Item value="b">Option B</Select.Item>
        </Select.Content>
      </Select>
    );
    await user.click(screen.getByText("Choose"));
    expect(screen.getByText("Option A")).toBeDefined();
    expect(screen.getByText("Option B")).toBeDefined();
  });

  it("selects value on item click", async () => {
    const user = userEvent.setup();
    render(
      <Select>
        <Select.Trigger>
          <Select.Value placeholder="Choose" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="a">Option A</Select.Item>
          <Select.Item value="b">Option B</Select.Item>
        </Select.Content>
      </Select>
    );
    await user.click(screen.getByText("Choose"));
    await user.click(screen.getByText("Option A"));
    expect(screen.getByText("Option A")).toBeDefined();
  });

  it("has data-slot on trigger", () => {
    render(
      <Select>
        <Select.Trigger>
          <Select.Value placeholder="Choose" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="a">A</Select.Item>
        </Select.Content>
      </Select>
    );
    const trigger = screen.getByRole("combobox");
    expect(trigger.closest("[data-slot=select-trigger]")).toBeDefined();
  });

  it("uses md as the default trigger size token", () => {
    render(
      <Select>
        <Select.Trigger>
          <Select.Value placeholder="Choose" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="a">Option A</Select.Item>
        </Select.Content>
      </Select>
    );

    const triggerWrapper = getRequiredTriggerWrapper();

    expect(triggerWrapper.dataset.size).toBe("md");
    expect(triggerWrapper.className.includes("h-9")).toBe(true);
  });

  it("cascades root size to trigger by default", () => {
    render(
      <Select size="xl">
        <Select.Trigger>
          <Select.Value placeholder="Choose" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="a">Option A</Select.Item>
        </Select.Content>
      </Select>
    );

    const triggerWrapper = getRequiredTriggerWrapper();

    expect(triggerWrapper.dataset.size).toBe("xl");
    expect(triggerWrapper.className.includes("h-11")).toBe(true);
  });

  it("supports explicit sm trigger size token", () => {
    render(
      <Select>
        <Select.Trigger size="sm">
          <Select.Value placeholder="Choose" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="a">Option A</Select.Item>
        </Select.Content>
      </Select>
    );

    const triggerWrapper = getRequiredTriggerWrapper();

    expect(triggerWrapper.dataset.size).toBe("sm");
    expect(triggerWrapper.className.includes("h-8")).toBe(true);
  });

  it("supports explicit lg trigger size token", () => {
    render(
      <Select>
        <Select.Trigger size="lg">
          <Select.Value placeholder="Choose" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="a">Option A</Select.Item>
        </Select.Content>
      </Select>
    );

    const triggerWrapper = getRequiredTriggerWrapper();

    expect(triggerWrapper.dataset.size).toBe("lg");
    expect(triggerWrapper.className.includes("h-10")).toBe(true);
  });

  it("prefers explicit trigger size over root size", () => {
    render(
      <Select size="xl">
        <Select.Trigger size="sm">
          <Select.Value placeholder="Choose" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="a">Option A</Select.Item>
        </Select.Content>
      </Select>
    );

    const triggerWrapper = getRequiredTriggerWrapper();

    expect(triggerWrapper.dataset.size).toBe("sm");
    expect(triggerWrapper.className.includes("h-8")).toBe(true);
  });

  it("cascades root size to popup item label and scroll controls", () => {
    render(
      <Select open size="xs">
        <Select.Trigger>
          <Select.Value placeholder="Choose" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Options</Select.Label>
            <Select.Item value="a">Option A</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select>
    );

    const popup = document.querySelector<HTMLElement>(
      "[data-slot=select-content]"
    );
    const item = document.querySelector<HTMLElement>("[data-slot=select-item]");
    const label = document.querySelector<HTMLElement>(
      "[data-slot=select-label]"
    );

    expect(popup?.dataset.size).toBe("xs");
    expect(item?.dataset.size).toBe("xs");
    expect(label?.dataset.size).toBe("xs");
  });

  it("prefers explicit content size over root size for overlay descendants", () => {
    render(
      <Select defaultValue="a" open size="xs">
        <Select.Trigger>
          <Select.Value placeholder="Choose" />
        </Select.Trigger>
        <Select.Content size="xl">
          <Select.Group>
            <Select.Label>Options</Select.Label>
            <Select.Item value="a">Option A</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select>
    );

    const popup = document.querySelector<HTMLElement>(
      "[data-slot=select-content]"
    );
    const item = document.querySelector<HTMLElement>("[data-slot=select-item]");
    const label = document.querySelector<HTMLElement>(
      "[data-slot=select-label]"
    );

    expect(popup?.dataset.size).toBe("xl");
    expect(item?.dataset.size).toBe("xl");
    expect(label?.dataset.size).toBe("xl");
  });

  it("prefers explicit item size over content and root sizes", () => {
    render(
      <Select open size="xs">
        <Select.Trigger>
          <Select.Value placeholder="Choose" />
        </Select.Trigger>
        <Select.Content size="sm">
          <Select.Group>
            <Select.Label>Options</Select.Label>
            <Select.Item size="xl" value="a">
              Option A
            </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select>
    );

    const popup = document.querySelector<HTMLElement>(
      "[data-slot=select-content]"
    );
    const item = document.querySelector<HTMLElement>("[data-slot=select-item]");

    expect(popup?.dataset.size).toBe("sm");
    expect(item?.dataset.size).toBe("xl");
  });

  it("preserves callback className on trigger and item wrappers", async () => {
    const user = userEvent.setup();

    render(
      <Select>
        <Select.Trigger className={triggerCallbackClassName}>
          <Select.Value placeholder="Pick option" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item className={itemCallbackClassName} value="a">
            Option A
          </Select.Item>
        </Select.Content>
      </Select>
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger.className.includes("trigger-callback")).toBe(true);
    expect(trigger.className.includes("border-input")).toBe(true);

    await user.click(trigger);
    const option = screen.getByRole("option", { name: "Option A" });
    expect(option.className.includes("item-callback")).toBe(true);
    expect(option.className.includes("rounded-sm")).toBe(true);
  });

  it("renders canonical popup subprimitives", () => {
    render(
      <Select open>
        <Select.Trigger>
          <Select.Value placeholder="Choose option" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Portal>
          <Select.Backdrop />
          <Select.Positioner>
            <Select.Popup className={popupCallbackClassName}>
              <Select.Arrow />
              <Select.ScrollUpArrow />
              <Select.List>
                <Select.Item value="a">
                  <Select.ItemText>Option A</Select.ItemText>
                  <Select.ItemIndicator>check</Select.ItemIndicator>
                </Select.Item>
              </Select.List>
              <Select.ScrollDownArrow />
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select>
    );

    expect(document.querySelector("[data-slot=select-portal]")).toBeDefined();
    expect(document.querySelector("[data-slot=select-backdrop]")).toBeDefined();
    expect(
      document.querySelector("[data-slot=select-positioner]")
    ).toBeDefined();
    const popup = document.querySelector("[data-slot=select-popup]");
    expect(popup).toBeDefined();
    expect(popup?.className.includes("popup-callback")).toBe(true);
    expect(document.querySelector("[data-slot=select-arrow]")).toBeDefined();
    expect(document.querySelector("[data-slot=select-list]")).toBeDefined();
    expect(
      document.querySelector("[data-slot=select-item-text]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=select-item-indicator]")
    ).toBeDefined();
    expect(document.querySelector("[data-slot=select-icon]")).toBeDefined();
  });
});
