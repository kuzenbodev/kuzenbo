import { afterEach, describe, expect, it } from "bun:test";

/* eslint-disable func-style */
import { act, cleanup, render, screen } from "@testing-library/react";
import createUserEvent from "@testing-library/user-event";

import { Autocomplete, useFilteredItems } from "./autocomplete";

const items = ["Apple", "Banana", "Cherry"];
function triggerClassName() {
  return "callback-trigger";
}
function itemClassName() {
  return "callback-item";
}
function popupClassName() {
  return "callback-popup";
}

afterEach(cleanup);

describe("Autocomplete", () => {
  it("preserves callback className on Trigger and merges base class", () => {
    render(
      <Autocomplete items={items}>
        <Autocomplete.Trigger className={triggerClassName}>
          <Autocomplete.Value>Search</Autocomplete.Value>
        </Autocomplete.Trigger>
        <Autocomplete.Content>
          <Autocomplete.List>
            {(item: string) => (
              <Autocomplete.Item key={item} value={item}>
                {item}
              </Autocomplete.Item>
            )}
          </Autocomplete.List>
        </Autocomplete.Content>
      </Autocomplete>
    );

    const trigger = document.querySelector("[data-slot=autocomplete-trigger]");
    expect(trigger).toBeDefined();
    expect(trigger?.className.includes("cursor-clickable")).toBe(true);
    expect(trigger?.className.includes("callback-trigger")).toBe(true);
  });

  it("preserves callback className on Item and merges base class", async () => {
    const user = createUserEvent.setup();

    render(
      <Autocomplete items={items}>
        <Autocomplete.Input placeholder="Search options..." />
        <Autocomplete.Content>
          <Autocomplete.List>
            {(item: string) => (
              <Autocomplete.Item
                className={itemClassName}
                key={item}
                value={item}
              >
                {item}
              </Autocomplete.Item>
            )}
          </Autocomplete.List>
        </Autocomplete.Content>
      </Autocomplete>
    );

    const combobox = screen.getByRole("combobox");
    await user.click(combobox);
    await user.keyboard("{ArrowDown}");

    const option = screen.getByRole("option", { name: "Apple" });
    expect(option.className.includes("relative")).toBe(true);
    expect(option.className.includes("callback-item")).toBe(true);
  });

  it("renders canonical listbox semantics when opened", async () => {
    const user = createUserEvent.setup();

    render(
      <Autocomplete items={items}>
        <Autocomplete.Input placeholder="Search options..." />
        <Autocomplete.Content>
          <Autocomplete.List>
            {(item: string) => (
              <Autocomplete.Item key={item} value={item}>
                {item}
              </Autocomplete.Item>
            )}
          </Autocomplete.List>
        </Autocomplete.Content>
      </Autocomplete>
    );

    const combobox = screen.getByRole("combobox");
    await user.click(combobox);
    await user.keyboard("{ArrowDown}");

    expect(screen.getByRole("listbox")).toBeDefined();
    expect(screen.getAllByRole("option").length).toBe(3);
  });

  it("renders Backdrop and Arrow wrappers with data-slot attributes", async () => {
    await act(async () => {
      render(
        <Autocomplete items={items} open>
          <Autocomplete.Input />
          <Autocomplete.Backdrop />
          <Autocomplete.Content>
            <Autocomplete.Arrow />
            <Autocomplete.List>
              {(item: string) => (
                <Autocomplete.Item key={item} value={item}>
                  {item}
                </Autocomplete.Item>
              )}
            </Autocomplete.List>
          </Autocomplete.Content>
        </Autocomplete>
      );
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(
      document.querySelector("[data-slot=autocomplete-backdrop]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=autocomplete-arrow]")
    ).toBeDefined();
  });

  it("preserves callback className on Popup and exposes popup subprimitive", async () => {
    await act(async () => {
      render(
        <Autocomplete items={items} open>
          <Autocomplete.Input />
          <Autocomplete.Portal>
            <Autocomplete.Positioner>
              <Autocomplete.Popup className={popupClassName}>
                <Autocomplete.List>
                  {(item: string) => (
                    <Autocomplete.Item key={item} value={item}>
                      {item}
                    </Autocomplete.Item>
                  )}
                </Autocomplete.List>
              </Autocomplete.Popup>
            </Autocomplete.Positioner>
          </Autocomplete.Portal>
        </Autocomplete>
      );
    });

    const popup = document.querySelector("[data-slot=autocomplete-popup]");
    expect(popup).toBeDefined();
    expect(popup?.className.includes("callback-popup")).toBe(true);
    expect(popup?.className.includes("rounded-md")).toBe(true);
  });

  it("exports useFilteredItems from @kuzenbo/core/ui/autocomplete surface", () => {
    expect(typeof useFilteredItems).toBe("function");
  });

  it("uses md as the default input size token", () => {
    render(
      <Autocomplete items={items}>
        <Autocomplete.Input placeholder="Search options..." />
      </Autocomplete>
    );

    const input = screen.getByRole("combobox");

    expect(input.dataset.size).toBe("md");
    expect(input.className.includes("h-9")).toBe(true);
  });

  it("cascades root size to input by default", () => {
    render(
      <Autocomplete items={items} size="xl">
        <Autocomplete.Input placeholder="Search options..." />
      </Autocomplete>
    );

    const input = screen.getByRole("combobox");

    expect(input.dataset.size).toBe("xl");
    expect(input.className.includes("h-11")).toBe(true);
  });

  it("prefers explicit input size over root size", () => {
    render(
      <Autocomplete items={items} size="xl">
        <Autocomplete.Input placeholder="Search options..." size="sm" />
      </Autocomplete>
    );

    const input = screen.getByRole("combobox");

    expect(input.dataset.size).toBe("sm");
    expect(input.className.includes("h-8")).toBe(true);
  });

  it("supports lg input size as a taller step than md", () => {
    render(
      <Autocomplete items={items}>
        <Autocomplete.Input placeholder="Search options..." size="lg" />
      </Autocomplete>
    );

    const input = screen.getByRole("combobox");

    expect(input.dataset.size).toBe("lg");
    expect(input.className.includes("h-10")).toBe(true);
  });

  it("cascades root size to popup and overlay child surfaces", () => {
    render(
      <Autocomplete items={items} open size="xs">
        <Autocomplete.Input placeholder="Search options..." />
        <Autocomplete.Content>
          <Autocomplete.Empty>No options found.</Autocomplete.Empty>
          <Autocomplete.List>
            <Autocomplete.Row>
              <Autocomplete.Group>
                <Autocomplete.GroupLabel>Fruits</Autocomplete.GroupLabel>
                <Autocomplete.Item value="Apple">Apple</Autocomplete.Item>
              </Autocomplete.Group>
            </Autocomplete.Row>
          </Autocomplete.List>
          <Autocomplete.Status>1 result</Autocomplete.Status>
        </Autocomplete.Content>
      </Autocomplete>
    );

    const popup = document.querySelector<HTMLElement>(
      "[data-slot=autocomplete-content]"
    );
    const row = document.querySelector<HTMLElement>(
      "[data-slot=autocomplete-row]"
    );
    const item = document.querySelector<HTMLElement>(
      "[data-slot=autocomplete-item]"
    );
    const groupLabel = document.querySelector<HTMLElement>(
      "[data-slot=autocomplete-group-label]"
    );
    const status = document.querySelector<HTMLElement>(
      "[data-slot=autocomplete-status]"
    );
    const empty = document.querySelector<HTMLElement>(
      "[data-slot=autocomplete-empty]"
    );

    expect(popup?.dataset.size).toBe("xs");
    expect(row?.dataset.size).toBe("xs");
    expect(item?.dataset.size).toBe("xs");
    expect(groupLabel?.dataset.size).toBe("xs");
    expect(status?.dataset.size).toBe("xs");
    expect(empty?.dataset.size).toBe("xs");
  });

  it("prefers explicit content size over root size for overlay descendants", () => {
    render(
      <Autocomplete items={items} open size="xs">
        <Autocomplete.Input placeholder="Search options..." />
        <Autocomplete.Content size="xl">
          <Autocomplete.List>
            <Autocomplete.Row>
              <Autocomplete.Item value="Apple">Apple</Autocomplete.Item>
            </Autocomplete.Row>
          </Autocomplete.List>
          <Autocomplete.Status>1 result</Autocomplete.Status>
        </Autocomplete.Content>
      </Autocomplete>
    );

    const popup = document.querySelector<HTMLElement>(
      "[data-slot=autocomplete-content]"
    );
    const row = document.querySelector<HTMLElement>(
      "[data-slot=autocomplete-row]"
    );
    const item = document.querySelector<HTMLElement>(
      "[data-slot=autocomplete-item]"
    );
    const status = document.querySelector<HTMLElement>(
      "[data-slot=autocomplete-status]"
    );

    expect(popup?.dataset.size).toBe("xl");
    expect(row?.dataset.size).toBe("xl");
    expect(item?.dataset.size).toBe("xl");
    expect(status?.dataset.size).toBe("xl");
  });

  it("prefers explicit item size over content and root sizes", () => {
    render(
      <Autocomplete items={items} open size="xs">
        <Autocomplete.Input placeholder="Search options..." />
        <Autocomplete.Content size="sm">
          <Autocomplete.List>
            <Autocomplete.Row>
              <Autocomplete.Item size="lg" value="Apple">
                Apple
              </Autocomplete.Item>
            </Autocomplete.Row>
          </Autocomplete.List>
        </Autocomplete.Content>
      </Autocomplete>
    );

    const popup = document.querySelector<HTMLElement>(
      "[data-slot=autocomplete-content]"
    );
    const item = document.querySelector<HTMLElement>(
      "[data-slot=autocomplete-item]"
    );

    expect(popup?.dataset.size).toBe("sm");
    expect(item?.dataset.size).toBe("lg");
  });

  it("has data-slot on root", () => {
    render(
      <Autocomplete items={items}>
        <Autocomplete.Input placeholder="Search options..." />
        <Autocomplete.Content>
          <Autocomplete.List>
            {(item: string) => (
              <Autocomplete.Item key={item} value={item}>
                {item}
              </Autocomplete.Item>
            )}
          </Autocomplete.List>
        </Autocomplete.Content>
      </Autocomplete>
    );

    expect(document.querySelector("[data-slot=autocomplete]")).toBeDefined();
  });
});
