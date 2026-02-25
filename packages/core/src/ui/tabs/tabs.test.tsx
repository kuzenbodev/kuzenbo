import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";
import { useCallback, useState } from "react";

import { Tabs } from "./tabs";

afterEach(cleanup);

const TAB_ONE = "tab1";
const TAB_TWO = "tab2";
const ROOT_CLASS_NAME = () => "root-from-fn";
const LIST_CLASS_NAME = () => "list-from-fn";
const TRIGGER_CLASS_NAME = () => "trigger-from-fn";
const CONTENT_CLASS_NAME = () => "content-from-fn";
const INDICATOR_CLASS_NAME = () => "indicator-from-fn";

const getActiveTrigger = () =>
  document.querySelector<HTMLElement>("[data-slot=tabs-trigger][data-active]");

const ControlledTabsHarness = () => {
  const [value, setValue] = useState<string>(TAB_ONE);
  const handleValueChange = useCallback((nextValue: unknown) => {
    setValue(String(nextValue));
  }, []);

  return (
    <Tabs onValueChange={handleValueChange} value={value}>
      <Tabs.List>
        <Tabs.Trigger value={TAB_ONE}>Tab 1</Tabs.Trigger>
        <Tabs.Trigger value={TAB_TWO}>Tab 2</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value={TAB_ONE}>Content 1</Tabs.Content>
      <Tabs.Content value={TAB_TWO}>Content 2</Tabs.Content>
    </Tabs>
  );
};

const renderTabs = (props?: {
  activateOnFocus?: boolean;
  disabledSecond?: boolean;
}) =>
  render(
    <Tabs defaultValue={TAB_ONE}>
      <Tabs.List activateOnFocus={props?.activateOnFocus}>
        <Tabs.Trigger value={TAB_ONE}>Tab 1</Tabs.Trigger>
        <Tabs.Trigger disabled={props?.disabledSecond} value={TAB_TWO}>
          Tab 2
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value={TAB_ONE}>Content 1</Tabs.Content>
      <Tabs.Content value={TAB_TWO}>Content 2</Tabs.Content>
    </Tabs>
  );

describe("Tabs", () => {
  it("renders tabs", () => {
    render(
      <Tabs defaultValue={TAB_ONE}>
        <Tabs.List>
          <Tabs.Trigger value={TAB_ONE}>Tab 1</Tabs.Trigger>
          <Tabs.Trigger value={TAB_TWO}>Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={TAB_ONE}>Content 1</Tabs.Content>
      </Tabs>
    );
    expect(screen.getByText("Tab 1")).toBeDefined();
    expect(screen.getByText("Content 1")).toBeDefined();
  });

  it("switches content on tab click", async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByText("Tab 2"));
    expect(screen.getByText("Content 2")).toBeDefined();
  });

  it("has data-slot on root", () => {
    render(
      <Tabs>
        <Tabs.List>
          <Tabs.Trigger value="a">A</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="a">Content</Tabs.Content>
      </Tabs>
    );
    expect(document.querySelector("[data-slot=tabs]")).toBeDefined();
  });

  it("exposes Base UI aliases for tab and panel parts", () => {
    render(
      <Tabs defaultValue={TAB_ONE}>
        <Tabs.List>
          <Tabs.Tab value={TAB_ONE}>Tab 1</Tabs.Tab>
          <Tabs.Tab value={TAB_TWO}>Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value={TAB_ONE}>Content 1</Tabs.Panel>
        <Tabs.Panel value={TAB_TWO}>Content 2</Tabs.Panel>
      </Tabs>
    );

    expect(Tabs.Tab).toBeDefined();
    expect(Tabs.Panel).toBeDefined();
    expect(screen.getByRole("tab", { name: "Tab 1" })).toBeDefined();
    expect(screen.getByText("Content 1")).toBeDefined();
  });

  it("preserves className callback support for all Tabs parts", () => {
    render(
      <Tabs className={ROOT_CLASS_NAME} defaultValue={TAB_ONE}>
        <Tabs.List className={LIST_CLASS_NAME} variant="line">
          <Tabs.Trigger className={TRIGGER_CLASS_NAME} value={TAB_ONE}>
            Tab 1
          </Tabs.Trigger>
          <Tabs.Trigger value={TAB_TWO}>Tab 2</Tabs.Trigger>
          <Tabs.Indicator className={INDICATOR_CLASS_NAME} />
        </Tabs.List>
        <Tabs.Content className={CONTENT_CLASS_NAME} value={TAB_ONE}>
          Content 1
        </Tabs.Content>
        <Tabs.Content value={TAB_TWO}>Content 2</Tabs.Content>
      </Tabs>
    );

    const root = document.querySelector<HTMLElement>("[data-slot=tabs]");
    const list = document.querySelector<HTMLElement>("[data-slot=tabs-list]");
    const trigger = document.querySelector<HTMLElement>(
      "[data-slot=tabs-trigger]"
    );
    const content = document.querySelector<HTMLElement>(
      "[data-slot=tabs-content]"
    );
    const indicator = document.querySelector<HTMLElement>(
      "[data-slot=tabs-indicator]"
    );

    expect(root?.className.includes("root-from-fn")).toBe(true);
    expect(list?.className.includes("list-from-fn")).toBe(true);
    expect(trigger?.className.includes("trigger-from-fn")).toBe(true);
    expect(content?.className.includes("content-from-fn")).toBe(true);
    expect(indicator?.className.includes("indicator-from-fn")).toBe(true);
  });

  it("supports fullWidth prop on list", () => {
    render(
      <Tabs defaultValue={TAB_ONE}>
        <Tabs.List fullWidth>
          <Tabs.Trigger value={TAB_ONE}>Tab 1</Tabs.Trigger>
          <Tabs.Trigger value={TAB_TWO}>Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={TAB_ONE}>Content 1</Tabs.Content>
        <Tabs.Content value={TAB_TWO}>Content 2</Tabs.Content>
      </Tabs>
    );

    const list = document.querySelector<HTMLElement>("[data-slot=tabs-list]");
    expect(list?.dataset.fullWidth).toBe("true");
    expect(list?.className.includes("w-full")).toBe(true);
  });

  it("defaults list variant to default and size to md", () => {
    render(
      <Tabs defaultValue={TAB_ONE}>
        <Tabs.List>
          <Tabs.Trigger value={TAB_ONE}>Tab 1</Tabs.Trigger>
          <Tabs.Trigger value={TAB_TWO}>Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value={TAB_ONE}>Content 1</Tabs.Content>
        <Tabs.Content value={TAB_TWO}>Content 2</Tabs.Content>
      </Tabs>
    );

    const list = document.querySelector<HTMLElement>("[data-slot=tabs-list]");

    expect(list?.dataset.variant).toBe("default");
    expect(list?.dataset.size).toBe("md");
  });

  it("supports line and pill variants with size options", () => {
    render(
      <div>
        <Tabs defaultValue="line-a">
          <Tabs.List size="sm" variant="line">
            <Tabs.Trigger value="line-a">Line A</Tabs.Trigger>
            <Tabs.Trigger value="line-b">Line B</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="line-a">Line A content</Tabs.Content>
          <Tabs.Content value="line-b">Line B content</Tabs.Content>
        </Tabs>
        <Tabs defaultValue="pill-a">
          <Tabs.List size="lg" variant="pill">
            <Tabs.Trigger value="pill-a">Pill A</Tabs.Trigger>
            <Tabs.Trigger value="pill-b">Pill B</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="pill-a">Pill A content</Tabs.Content>
          <Tabs.Content value="pill-b">Pill B content</Tabs.Content>
        </Tabs>
      </div>
    );

    const lists = document.querySelectorAll<HTMLElement>(
      "[data-slot=tabs-list]"
    );

    expect(lists[0]?.dataset.variant).toBe("line");
    expect(lists[0]?.dataset.size).toBe("sm");
    expect(lists[1]?.dataset.variant).toBe("pill");
    expect(lists[1]?.dataset.size).toBe("lg");
  });

  it("propagates list size styling to triggers", () => {
    render(
      <div>
        <Tabs defaultValue="small">
          <Tabs.List size="sm">
            <Tabs.Trigger value="small">Small Trigger</Tabs.Trigger>
            <Tabs.Trigger value="small-two">Small Trigger 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="small">Small content</Tabs.Content>
          <Tabs.Content value="small-two">Small content 2</Tabs.Content>
        </Tabs>
        <Tabs defaultValue="large">
          <Tabs.List size="lg">
            <Tabs.Trigger value="large">Large Trigger</Tabs.Trigger>
            <Tabs.Trigger value="large-two">Large Trigger 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="large">Large content</Tabs.Content>
          <Tabs.Content value="large-two">Large content 2</Tabs.Content>
        </Tabs>
      </div>
    );

    const smallTrigger = screen.getByRole("tab", { name: "Small Trigger" });
    const largeTrigger = screen.getByRole("tab", { name: "Large Trigger" });

    expect(smallTrigger.className.includes("h-7")).toBe(true);
    expect(largeTrigger.className.includes("h-9")).toBe(true);
  });

  it("shows indicator for default, line, and pill variants", () => {
    render(
      <div>
        <Tabs defaultValue="default-a">
          <Tabs.List variant="default">
            <Tabs.Trigger value="default-a">Default A</Tabs.Trigger>
            <Tabs.Trigger value="default-b">Default B</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="default-a">Default A content</Tabs.Content>
          <Tabs.Content value="default-b">Default B content</Tabs.Content>
        </Tabs>
        <Tabs defaultValue="line-a">
          <Tabs.List variant="line">
            <Tabs.Trigger value="line-a">Line A</Tabs.Trigger>
            <Tabs.Trigger value="line-b">Line B</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="line-a">Line A content</Tabs.Content>
          <Tabs.Content value="line-b">Line B content</Tabs.Content>
        </Tabs>
        <Tabs defaultValue="pill-a">
          <Tabs.List variant="pill">
            <Tabs.Trigger value="pill-a">Pill A</Tabs.Trigger>
            <Tabs.Trigger value="pill-b">Pill B</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="pill-a">Pill A content</Tabs.Content>
          <Tabs.Content value="pill-b">Pill B content</Tabs.Content>
        </Tabs>
      </div>
    );

    const indicators = document.querySelectorAll<HTMLElement>(
      "[data-slot=tabs-indicator]"
    );

    expect(indicators[0]?.className.includes("hidden")).toBe(false);
    expect(indicators[1]?.className.includes("hidden")).toBe(false);
    expect(indicators[2]?.className.includes("hidden")).toBe(false);
  });

  it("keeps active tab unchanged on arrow key focus when activateOnFocus is false", async () => {
    const user = userEvent.setup();
    renderTabs({ activateOnFocus: false });

    await user.click(screen.getByRole("tab", { name: "Tab 1" }));
    await user.keyboard("{ArrowRight}");

    expect(getActiveTrigger()?.textContent).toBe("Tab 1");
  });

  it("activates focused tab on arrow key focus when activateOnFocus is true", async () => {
    const user = userEvent.setup();
    renderTabs({ activateOnFocus: true });

    await user.click(screen.getByRole("tab", { name: "Tab 1" }));
    await user.keyboard("{ArrowRight}");

    expect(getActiveTrigger()?.textContent).toBe("Tab 2");
  });

  it("updates content in controlled mode through value and onValueChange", async () => {
    const user = userEvent.setup();
    render(<ControlledTabsHarness />);

    await user.click(screen.getByRole("tab", { name: "Tab 2" }));

    expect(screen.queryByText("Content 1")).toBeNull();
    expect(screen.getByText("Content 2")).toBeDefined();
    expect(getActiveTrigger()?.textContent).toBe("Tab 2");
  });

  it("does not activate disabled tabs", async () => {
    const user = userEvent.setup();
    renderTabs({ disabledSecond: true });

    const disabledTab = screen.getByRole("tab", { name: "Tab 2" });
    await user.click(disabledTab);

    expect(disabledTab.getAttribute("aria-disabled")).toBe("true");
    expect("disabled" in disabledTab.dataset).toBe(true);
    expect(getActiveTrigger()?.textContent).toBe("Tab 1");
    expect(screen.getByText("Content 1")).toBeDefined();
    expect(screen.queryByText("Content 2")).toBeNull();
  });
});
