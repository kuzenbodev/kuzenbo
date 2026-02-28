import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { ToggleGroup } from "./toggle-group";

afterEach(cleanup);

const GROUP_CLASS_NAME = () => "toggle-group-from-fn";
const ITEM_CLASS_NAME = () => "toggle-group-item-from-fn";
const UI_SIZE_TOKENS = ["xs", "sm", "md", "lg", "xl"] as const;
const queryRequiredToggleGroup = () => {
  const group = document.querySelector<HTMLElement>("[data-slot=toggle-group]");

  if (!group) {
    throw new Error("Expected toggle-group to render");
  }

  return group;
};
const queryRequiredToggleGroupItem = () => {
  const item = document.querySelector<HTMLElement>(
    "[data-slot=toggle-group-item]"
  );

  if (!item) {
    throw new Error("Expected toggle-group item to render");
  }

  return item;
};

describe("ToggleGroup", () => {
  it("renders toggle items", () => {
    render(
      <ToggleGroup multiple={false}>
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">B</ToggleGroup.Item>
      </ToggleGroup>
    );
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <ToggleGroup multiple={false}>
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
      </ToggleGroup>
    );
    expect(document.querySelector("[data-slot=toggle-group]")).toBeDefined();
  });

  it("preserves className callback support for root and items", () => {
    render(
      <ToggleGroup className={GROUP_CLASS_NAME} defaultValue={["a"]} multiple>
        <ToggleGroup.Item className={ITEM_CLASS_NAME} value="a">
          A
        </ToggleGroup.Item>
      </ToggleGroup>
    );

    const group = document.querySelector<HTMLElement>(
      "[data-slot=toggle-group]"
    );
    const item = document.querySelector<HTMLElement>(
      "[data-slot=toggle-group-item]"
    );

    expect(group?.className.includes("toggle-group-from-fn")).toBe(true);
    expect(item?.className.includes("toggle-group-item-from-fn")).toBe(true);
  });

  it("uses md as the default size token for items", () => {
    render(
      <ToggleGroup multiple={false}>
        <ToggleGroup.Item value="a">A</ToggleGroup.Item>
      </ToggleGroup>
    );

    const item = queryRequiredToggleGroupItem();

    expect(item.dataset.size).toBe("md");
    expect(item.className.includes("h-8")).toBe(true);
  });

  it("supports explicit sm size token for items", () => {
    render(
      <ToggleGroup multiple={false} size="xl">
        <ToggleGroup.Item size="sm" value="a">
          A
        </ToggleGroup.Item>
      </ToggleGroup>
    );

    const group = queryRequiredToggleGroup();
    const item = queryRequiredToggleGroupItem();

    expect(group.dataset.size).toBe("xl");
    expect(item.dataset.size).toBe("sm");
    expect(item.className.includes("h-7")).toBe(true);
  });

  it("supports all UISize tokens on root and items", () => {
    const expectedHeightClassBySize = {
      xs: "h-6",
      sm: "h-7",
      md: "h-8",
      lg: "h-9",
      xl: "h-10",
    } as const;

    for (const size of UI_SIZE_TOKENS) {
      const { unmount } = render(
        <ToggleGroup multiple={false} size={size}>
          <ToggleGroup.Item value={size}>{size}</ToggleGroup.Item>
        </ToggleGroup>
      );

      const group = queryRequiredToggleGroup();
      const item = queryRequiredToggleGroupItem();

      expect(group.dataset.size).toBe(size);
      expect(item.dataset.size).toBe(size);
      expect(item.className.includes(expectedHeightClassBySize[size])).toBe(
        true
      );

      unmount();
    }
  });
});
