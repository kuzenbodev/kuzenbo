import { cleanup, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "bun:test";
import { useState } from "react";

import type { UISize } from "../shared/size/size-system";

import { NavigationList } from "./navigation-list";

afterEach(cleanup);

const queryRequiredElement = (selector: string) => {
  const element = document.querySelector<HTMLElement>(selector);

  if (!element) {
    throw new Error(`Expected element to match selector: ${selector}`);
  }

  return element;
};

const ROOT_CLASS_NAME_CALLBACK = () => "navigation-list-root-from-fn";
const LINK_CLASS_NAME_CALLBACK = () => "navigation-list-link-from-fn";

let nonCollapsibleOpenChangeCalls = 0;

const handleNonCollapsibleOpenedChange = () => {
  nonCollapsibleOpenChangeCalls += 1;
};

let controlledOpenedValues: boolean[] = [];
let setControlledOpened: ((value: boolean) => void) | null = null;

const handleControlledOpenedChange = (value: boolean) => {
  controlledOpenedValues.push(value);
  setControlledOpened?.(value);
};

const ControlledNavigationList = () => {
  const [opened, setOpened] = useState(false);
  setControlledOpened = setOpened;

  return (
    <NavigationList>
      <NavigationList.Content>
        <NavigationList.Item
          collapsible
          onOpenedChange={handleControlledOpenedChange}
          opened={opened}
        >
          <NavigationList.Link>Settings</NavigationList.Link>
          <NavigationList.Sub>
            <NavigationList.SubItem>
              <NavigationList.SubLink href="#">Profile</NavigationList.SubLink>
            </NavigationList.SubItem>
          </NavigationList.Sub>
        </NavigationList.Item>
      </NavigationList.Content>
    </NavigationList>
  );
};

describe("NavigationList", () => {
  it("renders root and compound parts with stable data-slot attributes", () => {
    render(
      <NavigationList>
        <NavigationList.Content>
          <NavigationList.Group>
            <NavigationList.GroupLabel>Workspace</NavigationList.GroupLabel>
            <NavigationList.GroupContent>
              <NavigationList.Item collapsible defaultOpened>
                <NavigationList.Link label="Dashboard" />
                <NavigationList.Action aria-label="Open actions">
                  +
                </NavigationList.Action>
                <NavigationList.Badge>3</NavigationList.Badge>
                <NavigationList.Sub>
                  <NavigationList.SubItem>
                    <NavigationList.SubLink href="#">
                      Reports
                    </NavigationList.SubLink>
                  </NavigationList.SubItem>
                </NavigationList.Sub>
              </NavigationList.Item>
            </NavigationList.GroupContent>
          </NavigationList.Group>

          <NavigationList.Separator />

          <NavigationList.Item>
            <NavigationList.Skeleton showIcon />
          </NavigationList.Item>
        </NavigationList.Content>
      </NavigationList>
    );

    expect(document.querySelector("[data-slot=navigation-list]")).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-list-content]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-list-group]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-list-group-label]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-list-group-content]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-list-item]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-list-link]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-list-action]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-list-badge]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-list-sub]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-list-sub-item]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-list-sub-link]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-list-separator]")
    ).toBeDefined();
    expect(
      document.querySelector("[data-slot=navigation-list-skeleton]")
    ).toBeDefined();
  });

  it("uses md as default size and cascades to row and subrow slots", () => {
    render(
      <NavigationList>
        <NavigationList.Content>
          <NavigationList.Item collapsible defaultOpened>
            <NavigationList.Link>Dashboard</NavigationList.Link>
            <NavigationList.Action aria-label="Open actions">
              +
            </NavigationList.Action>
            <NavigationList.Badge>3</NavigationList.Badge>
            <NavigationList.Sub>
              <NavigationList.SubItem>
                <NavigationList.SubLink href="#">
                  Reports
                </NavigationList.SubLink>
              </NavigationList.SubItem>
            </NavigationList.Sub>
          </NavigationList.Item>
        </NavigationList.Content>
      </NavigationList>
    );

    const root = queryRequiredElement("[data-slot=navigation-list]");
    const item = queryRequiredElement("[data-slot=navigation-list-item]");
    const link = queryRequiredElement("[data-slot=navigation-list-link]");
    const action = queryRequiredElement("[data-slot=navigation-list-action]");
    const badge = queryRequiredElement("[data-slot=navigation-list-badge]");
    const sub = queryRequiredElement("[data-slot=navigation-list-sub]");
    const subLink = queryRequiredElement(
      "[data-slot=navigation-list-sub-link]"
    );

    expect(root.dataset.size).toBe("md");
    expect(item.dataset.size).toBe("md");
    expect(link.dataset.size).toBe("md");
    expect(action.dataset.size).toBe("md");
    expect(badge.dataset.size).toBe("md");
    expect(sub.dataset.size).toBe("md");
    expect(subLink.dataset.size).toBe("md");
  });

  it("cascades explicit root sizes across the full xs..xl scale", () => {
    const sizes: UISize[] = ["xs", "sm", "md", "lg", "xl"];

    for (const size of sizes) {
      cleanup();

      render(
        <NavigationList size={size}>
          <NavigationList.Content>
            <NavigationList.Item collapsible defaultOpened>
              <NavigationList.Link>Dashboard ({size})</NavigationList.Link>
              <NavigationList.Sub>
                <NavigationList.SubItem>
                  <NavigationList.SubLink href="#">
                    Reports
                  </NavigationList.SubLink>
                </NavigationList.SubItem>
              </NavigationList.Sub>
            </NavigationList.Item>
          </NavigationList.Content>
        </NavigationList>
      );

      const root = queryRequiredElement("[data-slot=navigation-list]");
      const item = queryRequiredElement("[data-slot=navigation-list-item]");
      const link = queryRequiredElement("[data-slot=navigation-list-link]");
      const sub = queryRequiredElement("[data-slot=navigation-list-sub]");
      const subLink = queryRequiredElement(
        "[data-slot=navigation-list-sub-link]"
      );

      expect(root.dataset.size).toBe(size);
      expect(item.dataset.size).toBe(size);
      expect(link.dataset.size).toBe(size);
      expect(sub.dataset.size).toBe(size);
      expect(subLink.dataset.size).toBe(size);
    }
  });

  it("prefers explicit child sizes over inherited root and item sizes", () => {
    render(
      <NavigationList size="xl">
        <NavigationList.Content>
          <NavigationList.Item collapsible defaultOpened size="lg">
            <NavigationList.Link size="xs">Dashboard</NavigationList.Link>
            <NavigationList.Action aria-label="Open actions" size="sm">
              +
            </NavigationList.Action>
            <NavigationList.Badge size="md">3</NavigationList.Badge>
            <NavigationList.Sub size="lg">
              <NavigationList.SubItem>
                <NavigationList.SubLink href="#" size="xl">
                  Reports
                </NavigationList.SubLink>
              </NavigationList.SubItem>
            </NavigationList.Sub>
          </NavigationList.Item>
        </NavigationList.Content>
      </NavigationList>
    );

    const root = queryRequiredElement("[data-slot=navigation-list]");
    const item = queryRequiredElement("[data-slot=navigation-list-item]");
    const link = queryRequiredElement("[data-slot=navigation-list-link]");
    const action = queryRequiredElement("[data-slot=navigation-list-action]");
    const badge = queryRequiredElement("[data-slot=navigation-list-badge]");
    const sub = queryRequiredElement("[data-slot=navigation-list-sub]");
    const subLink = queryRequiredElement(
      "[data-slot=navigation-list-sub-link]"
    );

    expect(root.dataset.size).toBe("xl");
    expect(item.dataset.size).toBe("lg");
    expect(link.dataset.size).toBe("xs");
    expect(action.dataset.size).toBe("sm");
    expect(badge.dataset.size).toBe("md");
    expect(sub.dataset.size).toBe("lg");
    expect(subLink.dataset.size).toBe("xl");
  });

  it("reserves right-side spacing when action and badge slots are present", () => {
    render(
      <NavigationList>
        <NavigationList.Content>
          <NavigationList.Item collapsible>
            <NavigationList.Link>Projects</NavigationList.Link>
            <NavigationList.Action aria-label="Open actions">
              +
            </NavigationList.Action>
            <NavigationList.Badge>12</NavigationList.Badge>
          </NavigationList.Item>
        </NavigationList.Content>
      </NavigationList>
    );

    const link = queryRequiredElement("[data-slot=navigation-list-link]");
    const action = queryRequiredElement("[data-slot=navigation-list-action]");
    const badge = queryRequiredElement("[data-slot=navigation-list-badge]");

    expect(
      link.className.includes(
        "group-has-data-[slot=navigation-list-action]/navigation-list-item:pr-20"
      )
    ).toBe(true);
    expect(
      link.className.includes(
        "group-has-data-[slot=navigation-list-badge]/navigation-list-item:pr-20"
      )
    ).toBe(true);
    expect(action.className.includes("cursor-clickable")).toBe(true);
    expect(
      action.className.includes(
        "group-data-[collapsible=true]/navigation-list-item:right-10"
      )
    ).toBe(true);
    expect(
      action.className.includes(
        "group-has-data-[slot=navigation-list-badge]/navigation-list-item:right-14"
      )
    ).toBe(true);
    expect(
      badge.className.includes(
        "group-data-[collapsible=true]/navigation-list-item:right-8"
      )
    ).toBe(true);
  });

  it("keeps cursor-clickable utility on link roots without action wrappers", () => {
    render(
      <NavigationList>
        <NavigationList.Content>
          <NavigationList.Item>
            <NavigationList.Link href="/projects">Projects</NavigationList.Link>
          </NavigationList.Item>
        </NavigationList.Content>
      </NavigationList>
    );

    const link = queryRequiredElement("[data-slot=navigation-list-link]");

    expect(link.className.includes("cursor-clickable")).toBe(true);
  });

  it("supports controlled open state with onOpenedChange", async () => {
    const user = userEvent.setup();
    controlledOpenedValues = [];
    setControlledOpened = null;

    render(<ControlledNavigationList />);

    const item = queryRequiredElement("[data-slot=navigation-list-item]");
    const sub = queryRequiredElement("[data-slot=navigation-list-sub]");

    expect(item.dataset.open).toBe("false");
    expect(sub.dataset.open).toBe("false");
    expect(sub.getAttribute("hidden")).toBe("");

    await user.click(screen.getByRole("button", { name: "Settings" }));

    expect(controlledOpenedValues).toEqual([true]);
    expect(item.dataset.open).toBe("true");
    expect(sub.dataset.open).toBe("true");
    expect(sub.getAttribute("hidden")).toBeNull();
  });

  it("supports uncontrolled open state via defaultOpened", async () => {
    const user = userEvent.setup();

    render(
      <NavigationList>
        <NavigationList.Content>
          <NavigationList.Item collapsible defaultOpened>
            <NavigationList.Link>Projects</NavigationList.Link>
            <NavigationList.Sub>
              <NavigationList.SubItem>
                <NavigationList.SubLink href="#">Active</NavigationList.SubLink>
              </NavigationList.SubItem>
            </NavigationList.Sub>
          </NavigationList.Item>
        </NavigationList.Content>
      </NavigationList>
    );

    const item = queryRequiredElement("[data-slot=navigation-list-item]");
    const sub = queryRequiredElement("[data-slot=navigation-list-sub]");

    expect(item.dataset.open).toBe("true");
    expect(sub.dataset.open).toBe("true");
    expect(sub.getAttribute("hidden")).toBeNull();

    await user.click(screen.getByRole("button", { name: "Projects" }));

    expect(item.dataset.open).toBe("false");
    expect(sub.dataset.open).toBe("false");
    expect(sub.getAttribute("hidden")).toBe("");
  });

  it("renders collapsible rows as disclosure buttons even when href is passed", async () => {
    const user = userEvent.setup();
    const originalWarn = console.warn;
    const warnings: string[] = [];
    console.warn = (...args: unknown[]) => {
      const [firstArg] = args;
      warnings.push(String(firstArg));
    };

    render(
      <NavigationList>
        <NavigationList.Content>
          <NavigationList.Item collapsible>
            <NavigationList.Link href="/dashboard">
              Dashboard
            </NavigationList.Link>
          </NavigationList.Item>
        </NavigationList.Content>
      </NavigationList>
    );

    try {
      const item = queryRequiredElement("[data-slot=navigation-list-item]");
      const trigger = screen.getByRole("button", { name: "Dashboard" });

      expect(screen.queryByRole("link", { name: "Dashboard" })).toBeNull();
      await user.click(trigger);

      expect(item.dataset.open).toBe("true");
      expect(
        warnings.some((warning) =>
          warning.includes(
            "[NavigationList.Link] `href` is ignored when used inside `NavigationList.Item collapsible`."
          )
        )
      ).toBe(true);
    } finally {
      console.warn = originalWarn;
    }
  });

  it("keeps non-collapsible href rows navigable and does not toggle open state", () => {
    nonCollapsibleOpenChangeCalls = 0;

    render(
      <NavigationList>
        <NavigationList.Content>
          <NavigationList.Item
            onOpenedChange={handleNonCollapsibleOpenedChange}
          >
            <NavigationList.Link href="/billing">Billing</NavigationList.Link>
          </NavigationList.Item>
        </NavigationList.Content>
      </NavigationList>
    );

    const item = queryRequiredElement("[data-slot=navigation-list-item]");
    const link = screen.getByRole("link", { name: "Billing" });
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });

    link.dispatchEvent(clickEvent);

    expect(clickEvent.defaultPrevented).toBe(false);
    expect(item.dataset.open).toBe("false");
    expect(nonCollapsibleOpenChangeCalls).toBe(0);
  });

  it("suppresses the default chevron when rightSection is null", () => {
    render(
      <NavigationList>
        <NavigationList.Content>
          <NavigationList.Item collapsible>
            <NavigationList.Link rightSection={null}>
              Analytics
            </NavigationList.Link>
          </NavigationList.Item>
        </NavigationList.Content>
      </NavigationList>
    );

    expect(
      document.querySelector("[data-slot=navigation-list-link-right-section]")
    ).toBeNull();
  });

  it("marks rows as active via active prop and aria-current=page", () => {
    render(
      <NavigationList>
        <NavigationList.Content>
          <NavigationList.Item>
            <NavigationList.Link active href="#">
              Overview
            </NavigationList.Link>
          </NavigationList.Item>
          <NavigationList.Item>
            <NavigationList.Link aria-current="page" href="#">
              Activity
            </NavigationList.Link>
          </NavigationList.Item>
          <NavigationList.Item>
            <NavigationList.Link active>Button Active</NavigationList.Link>
          </NavigationList.Item>
          <NavigationList.Item>
            <NavigationList.SubLink active href="#">
              Sub Active
            </NavigationList.SubLink>
          </NavigationList.Item>
        </NavigationList.Content>
      </NavigationList>
    );

    const overview = screen.getByRole("link", { name: "Overview" });
    const activity = screen.getByRole("link", { name: "Activity" });
    const buttonActive = screen.getByRole("button", { name: "Button Active" });
    const subActive = screen.getByRole("link", { name: "Sub Active" });

    expect(overview.dataset.active).not.toBeNull();
    expect(activity.dataset.active).not.toBeNull();
    expect(overview.getAttribute("aria-current")).toBe("page");
    expect(activity.getAttribute("aria-current")).toBe("page");
    expect(buttonActive.getAttribute("aria-current")).toBeNull();
    expect(subActive.getAttribute("aria-current")).toBe("page");
  });

  it("keeps aria-expanded on disclosure triggers only", async () => {
    const user = userEvent.setup();

    render(
      <NavigationList>
        <NavigationList.Content>
          <NavigationList.Item collapsible>
            <NavigationList.Link>Projects</NavigationList.Link>
            <NavigationList.Sub>
              <NavigationList.SubItem>
                <NavigationList.SubLink href="#">Active</NavigationList.SubLink>
              </NavigationList.SubItem>
            </NavigationList.Sub>
          </NavigationList.Item>
          <NavigationList.Item>
            <NavigationList.Link href="#">Billing</NavigationList.Link>
          </NavigationList.Item>
        </NavigationList.Content>
      </NavigationList>
    );

    const projects = screen.getByRole("button", { name: "Projects" });
    const billing = screen.getByRole("link", { name: "Billing" });

    expect(projects.getAttribute("aria-expanded")).toBe("false");
    expect(billing.getAttribute("aria-expanded")).toBeNull();

    await user.click(projects);

    expect(projects.getAttribute("aria-expanded")).toBe("true");
  });

  it("keeps closed mounted submenu hidden from accessibility tree", async () => {
    const user = userEvent.setup();

    render(
      <NavigationList>
        <NavigationList.Content>
          <NavigationList.Item collapsible>
            <NavigationList.Link>Projects</NavigationList.Link>
            <NavigationList.Sub>
              <NavigationList.SubItem>
                <NavigationList.SubLink href="#">
                  Hidden Link
                </NavigationList.SubLink>
              </NavigationList.SubItem>
            </NavigationList.Sub>
          </NavigationList.Item>
        </NavigationList.Content>
      </NavigationList>
    );

    const sub = queryRequiredElement("[data-slot=navigation-list-sub]");

    expect(sub.getAttribute("hidden")).toBe("");
    expect(screen.queryByRole("link", { name: "Hidden Link" })).toBeNull();

    await user.click(screen.getByRole("button", { name: "Projects" }));

    expect(sub.getAttribute("hidden")).toBeNull();
    expect(screen.getByRole("link", { name: "Hidden Link" })).toBeDefined();
  });

  it("defaults navigation list action buttons to type=button", () => {
    render(
      <NavigationList>
        <NavigationList.Content>
          <NavigationList.Item>
            <NavigationList.Link>Projects</NavigationList.Link>
            <NavigationList.Action aria-label="Open actions">
              +
            </NavigationList.Action>
          </NavigationList.Item>
        </NavigationList.Content>
      </NavigationList>
    );

    expect(
      screen.getByRole("button", { name: "Open actions" }).getAttribute("type")
    ).toBe("button");
  });

  it("applies tone contracts for surface and sidebar variants", () => {
    render(
      <div>
        <NavigationList tone="surface" variant="light">
          <NavigationList.Content>
            <NavigationList.Item>
              <NavigationList.Link>Surface Link</NavigationList.Link>
            </NavigationList.Item>
          </NavigationList.Content>
        </NavigationList>

        <NavigationList tone="sidebar" variant="light">
          <NavigationList.Content>
            <NavigationList.Item>
              <NavigationList.Link>Sidebar Link</NavigationList.Link>
            </NavigationList.Item>
          </NavigationList.Content>
        </NavigationList>
      </div>
    );

    const surfaceContent = screen
      .getByRole("button", { name: "Surface Link" })
      .closest("[data-slot=navigation-list-content]");
    const sidebarContent = screen
      .getByRole("button", { name: "Sidebar Link" })
      .closest("[data-slot=navigation-list-content]");
    const surfaceLink = screen.getByRole("button", { name: "Surface Link" });
    const sidebarLink = screen.getByRole("button", { name: "Sidebar Link" });

    expect(surfaceContent?.className.includes("bg-background")).toBe(true);
    expect(surfaceContent?.className.includes("border-border")).toBe(true);
    expect(surfaceLink.className.includes("hover:bg-muted")).toBe(true);

    expect(sidebarContent?.className.includes("bg-sidebar")).toBe(true);
    expect(sidebarContent?.className.includes("border-sidebar-border")).toBe(
      true
    );
    expect(sidebarLink.className.includes("hover:bg-sidebar-accent")).toBe(
      true
    );
  });

  it("preserves className callback merge behavior for root and link", () => {
    render(
      <NavigationList className={ROOT_CLASS_NAME_CALLBACK}>
        <NavigationList.Content>
          <NavigationList.Item>
            <NavigationList.Link className={LINK_CLASS_NAME_CALLBACK}>
              Callback classes
            </NavigationList.Link>
          </NavigationList.Item>
        </NavigationList.Content>
      </NavigationList>
    );

    const root = queryRequiredElement("[data-slot=navigation-list]");
    const link = queryRequiredElement("[data-slot=navigation-list-link]");

    expect(root.className.includes("navigation-list-root-from-fn")).toBe(true);
    expect(root.className.includes("flex")).toBe(true);

    expect(link.className.includes("navigation-list-link-from-fn")).toBe(true);
    expect(link.className.includes("peer/navigation-list-link")).toBe(true);
  });
});
