import { afterEach, describe, expect, it } from "bun:test";

/* eslint-disable func-style */
import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Combobox } from "./combobox";

const firstItem = { value: "a", label: "Option A" };
const secondItem = { value: "b", label: "Option B" };
const items = [firstItem, secondItem];

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

describe("Combobox", () => {
  it("renders trigger with placeholder", () => {
    render(
      <Combobox items={items}>
        <Combobox.Trigger>
          <Combobox.Value>Select</Combobox.Value>
        </Combobox.Trigger>
        <Combobox.Content>
          <Combobox.Collection>
            {(item) => (
              <Combobox.Item key={item.value} value={item}>
                {item.label}
              </Combobox.Item>
            )}
          </Combobox.Collection>
        </Combobox.Content>
      </Combobox>
    );
    expect(screen.getByText("Select")).toBeDefined();
  });

  it("opens content on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Combobox items={items}>
        <Combobox.Trigger>
          <Combobox.Value>Choose</Combobox.Value>
        </Combobox.Trigger>
        <Combobox.Content>
          <Combobox.Collection>
            {(item) => (
              <Combobox.Item key={item.value} value={item}>
                {item.label}
              </Combobox.Item>
            )}
          </Combobox.Collection>
        </Combobox.Content>
      </Combobox>
    );
    await user.click(screen.getByRole("combobox"));
    const content = document.querySelector("[data-slot=combobox-content]");
    expect(content).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <Combobox items={[]}>
        <Combobox.Trigger>
          <Combobox.Value>Test</Combobox.Value>
        </Combobox.Trigger>
        <Combobox.Content>
          <Combobox.Collection>{() => null}</Combobox.Collection>
        </Combobox.Content>
      </Combobox>
    );
    expect(document.querySelector("[data-slot=combobox]")).toBeDefined();
  });

  it("cascades root size to input composition by default", () => {
    render(
      <Combobox items={items} size="xl">
        <Combobox.Input />
      </Combobox>
    );

    const inputGroup = document.querySelector<HTMLElement>(
      "[data-slot=input-group]"
    );
    const triggerButton = document.querySelector<HTMLElement>(
      "[data-slot=input-group-button]"
    );

    expect(inputGroup?.dataset.size).toBe("xl");
    expect(triggerButton?.dataset.size).toBe("icon-sm");
  });

  it("keeps the composed trigger icon centered by removing internal button gap", () => {
    render(
      <Combobox items={items}>
        <Combobox.Input />
      </Combobox>
    );

    const triggerButton = document.querySelector<HTMLElement>(
      "[data-slot=input-group-button]"
    );

    expect(triggerButton?.className.includes("gap-0")).toBe(true);
  });

  it("prefers explicit Combobox.Input size over root size", () => {
    render(
      <Combobox items={items} size="xl">
        <Combobox.Input size="sm" />
      </Combobox>
    );

    const inputGroup = document.querySelector<HTMLElement>(
      "[data-slot=input-group]"
    );
    const triggerButton = document.querySelector<HTMLElement>(
      "[data-slot=input-group-button]"
    );

    expect(inputGroup?.dataset.size).toBe("sm");
    expect(triggerButton?.dataset.size).toBe("icon-xs");
  });

  it("uses the lg input-group height step above md", () => {
    render(
      <Combobox items={items} size="lg">
        <Combobox.Input />
      </Combobox>
    );

    const inputGroup = document.querySelector<HTMLElement>(
      "[data-slot=input-group]"
    );

    expect(inputGroup?.dataset.size).toBe("lg");
    expect(inputGroup?.className.includes("data-[size=lg]:h-10")).toBe(true);
  });

  it("keeps popup input-group styles size-driven without forced h-8 override", () => {
    render(
      <Combobox items={items} open>
        <Combobox.Input />
        <Combobox.Portal>
          <Combobox.Positioner>
            <Combobox.Popup>
              <Combobox.List>
                <Combobox.Collection>
                  {(item) => (
                    <Combobox.Item key={item.value} value={item}>
                      {item.label}
                    </Combobox.Item>
                  )}
                </Combobox.Collection>
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox>
    );

    const popup = document.querySelector<HTMLElement>(
      "[data-slot=combobox-popup]"
    );
    expect(popup?.className.includes("*:data-[slot=input-group]:h-8")).toBe(
      false
    );
  });

  it("cascades root size to popup list and item surfaces", () => {
    render(
      <Combobox defaultValue={firstItem} items={items} open size="xs">
        <Combobox.Input />
        <Combobox.Content>
          <Combobox.Status>Ready</Combobox.Status>
          <Combobox.List>
            <Combobox.Row>
              <Combobox.Group>
                <Combobox.GroupLabel>Options</Combobox.GroupLabel>
                <Combobox.Item value={firstItem}>
                  {firstItem.label}
                </Combobox.Item>
              </Combobox.Group>
            </Combobox.Row>
          </Combobox.List>
          <Combobox.Empty>No options</Combobox.Empty>
        </Combobox.Content>
      </Combobox>
    );

    const popup = document.querySelector<HTMLElement>(
      "[data-slot=combobox-content]"
    );
    const list = document.querySelector<HTMLElement>(
      "[data-slot=combobox-list]"
    );
    const row = document.querySelector<HTMLElement>("[data-slot=combobox-row]");
    const item = document.querySelector<HTMLElement>(
      "[data-slot=combobox-item]"
    );
    const indicator = document.querySelector<HTMLElement>(
      "[data-slot=combobox-item-indicator]"
    );
    const groupLabel = document.querySelector<HTMLElement>(
      "[data-slot=combobox-group-label]"
    );
    const status = document.querySelector<HTMLElement>(
      "[data-slot=combobox-status]"
    );
    const empty = document.querySelector<HTMLElement>(
      "[data-slot=combobox-empty]"
    );

    expect(popup?.dataset.size).toBe("xs");
    expect(list?.dataset.size).toBe("xs");
    expect(row?.dataset.size).toBe("xs");
    expect(item?.dataset.size).toBe("xs");
    expect(indicator?.dataset.size).toBe("xs");
    expect(groupLabel?.dataset.size).toBe("xs");
    expect(status?.dataset.size).toBe("xs");
    expect(empty?.dataset.size).toBe("xs");
    expect(list?.style.getPropertyValue("--kb-combobox-anchor-offset")).toBe(
      "1.5rem"
    );
  });

  it("prefers explicit content size over root size for overlay descendants", () => {
    render(
      <Combobox items={items} open size="xs">
        <Combobox.Input />
        <Combobox.Content size="xl">
          <Combobox.List>
            <Combobox.Row>
              <Combobox.Item value={firstItem}>{firstItem.label}</Combobox.Item>
            </Combobox.Row>
          </Combobox.List>
        </Combobox.Content>
      </Combobox>
    );

    const popup = document.querySelector<HTMLElement>(
      "[data-slot=combobox-content]"
    );
    const list = document.querySelector<HTMLElement>(
      "[data-slot=combobox-list]"
    );
    const item = document.querySelector<HTMLElement>(
      "[data-slot=combobox-item]"
    );

    expect(popup?.dataset.size).toBe("xl");
    expect(list?.dataset.size).toBe("xl");
    expect(item?.dataset.size).toBe("xl");
    expect(list?.style.getPropertyValue("--kb-combobox-anchor-offset")).toBe(
      "2.75rem"
    );
  });

  it("prefers explicit item size over content and root sizes", () => {
    render(
      <Combobox defaultValue={firstItem} items={items} open size="xs">
        <Combobox.Input />
        <Combobox.Content size="sm">
          <Combobox.List>
            <Combobox.Row>
              <Combobox.Item size="xl" value={firstItem}>
                {firstItem.label}
              </Combobox.Item>
            </Combobox.Row>
          </Combobox.List>
        </Combobox.Content>
      </Combobox>
    );

    const popup = document.querySelector<HTMLElement>(
      "[data-slot=combobox-content]"
    );
    const item = document.querySelector<HTMLElement>(
      "[data-slot=combobox-item]"
    );
    const indicator = document.querySelector<HTMLElement>(
      "[data-slot=combobox-item-indicator]"
    );

    expect(popup?.dataset.size).toBe("sm");
    expect(item?.dataset.size).toBe("xl");
    expect(indicator?.dataset.size).toBe("xl");
  });

  it("preserves callback className on trigger and item wrappers", () => {
    render(
      <Combobox items={items} open>
        <Combobox.Trigger className={triggerCallbackClassName}>
          <Combobox.Value>Choose</Combobox.Value>
        </Combobox.Trigger>
        <Combobox.Content>
          <Combobox.Collection>
            {(item) => (
              <Combobox.Item
                className={itemCallbackClassName}
                key={item.value}
                value={item}
              >
                {item.label}
              </Combobox.Item>
            )}
          </Combobox.Collection>
        </Combobox.Content>
      </Combobox>
    );

    const trigger = screen.getByRole("combobox");
    expect(trigger.className.includes("trigger-callback")).toBe(true);
    expect(trigger.className.includes("cursor-clickable")).toBe(true);

    const item = document.querySelector("[data-slot=combobox-item]");
    expect(item).not.toBeNull();

    const itemElement = item as HTMLElement;
    expect(itemElement.className.includes("item-callback")).toBe(true);
    expect(itemElement.className.includes("rounded-md")).toBe(true);
    expect(itemElement.className.includes("data-highlighted:bg-accent")).toBe(
      true
    );
  });

  it("renders canonical popup and list subprimitives", () => {
    render(
      <Combobox items={items} open>
        <Combobox.Input />
        <Combobox.Portal>
          <Combobox.Backdrop />
          <Combobox.Positioner>
            <Combobox.Popup className={popupCallbackClassName}>
              <Combobox.Arrow />
              <Combobox.Status />
              <Combobox.List>
                <Combobox.Row>
                  <Combobox.Item value={firstItem}>
                    <Combobox.ItemIndicator>check</Combobox.ItemIndicator>
                    {firstItem.label}
                  </Combobox.Item>
                </Combobox.Row>
                <Combobox.Group>
                  <Combobox.GroupLabel>Group A</Combobox.GroupLabel>
                </Combobox.Group>
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox>
    );

    expect(document.querySelector("[data-slot=combobox-portal]")).toBeDefined();
    expect(
      document.querySelector("[data-slot=combobox-backdrop]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=combobox-positioner]")
    ).toBeDefined();
    const popup = document.querySelector("[data-slot=combobox-popup]");
    expect(popup).toBeDefined();
    expect(popup?.className.includes("popup-callback")).toBe(true);
    expect(document.querySelector("[data-slot=combobox-arrow]")).toBeDefined();
    expect(document.querySelector("[data-slot=combobox-status]")).toBeDefined();
    expect(document.querySelector("[data-slot=combobox-row]")).toBeDefined();
    expect(
      document.querySelector("[data-slot=combobox-group-label]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=combobox-item-indicator]")
    ).toBeDefined();
  });
});
