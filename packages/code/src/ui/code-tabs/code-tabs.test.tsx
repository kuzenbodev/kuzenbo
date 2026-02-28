import { afterEach, describe, expect, it, mock } from "bun:test";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { CodeTabs } from "./code-tabs";

afterEach(cleanup);

describe("CodeTabs", () => {
  const tabs = [
    {
      content: <code>npm install @kuzenbo/code</code>,
      label: "npm",
      value: "npm",
    },
    {
      content: <code>pnpm add @kuzenbo/code</code>,
      label: "pnpm",
      value: "pnpm",
    },
    {
      content: <code>bun add @kuzenbo/code</code>,
      label: "bun",
      value: "bun",
    },
  ] as const;

  it("renders first enabled tab by default", () => {
    render(<CodeTabs tabs={tabs} />);

    expect(screen.getByText("npm install @kuzenbo/code")).toBeDefined();
  });

  it("supports uncontrolled state via defaultValue", () => {
    render(<CodeTabs defaultValue="pnpm" tabs={tabs} />);

    expect(screen.getByText("pnpm add @kuzenbo/code")).toBeDefined();
  });

  it("changes selection on click and calls onValueChange", () => {
    const onValueChange = mock();

    render(<CodeTabs onValueChange={onValueChange} tabs={tabs} />);

    fireEvent.click(screen.getByRole("tab", { name: "bun" }));

    expect(onValueChange).toHaveBeenCalledWith("bun");
    expect(screen.getByText("bun add @kuzenbo/code")).toBeDefined();
  });

  it("supports controlled state", () => {
    const onValueChange = mock();

    render(<CodeTabs onValueChange={onValueChange} tabs={tabs} value="pnpm" />);

    fireEvent.click(screen.getByRole("tab", { name: "bun" }));

    expect(onValueChange).toHaveBeenCalledWith("bun");
    expect(screen.getByText("pnpm add @kuzenbo/code")).toBeDefined();
  });

  it("supports keyboard activation", async () => {
    const user = userEvent.setup();
    render(<CodeTabs tabs={tabs} />);

    await user.click(screen.getByRole("tab", { name: "npm" }));
    await user.keyboard("{ArrowRight}");

    expect(screen.getByText("pnpm add @kuzenbo/code")).toBeDefined();
  });

  it("keeps focus navigation from looping when loop is false", async () => {
    const user = userEvent.setup();
    render(<CodeTabs loop={false} tabs={tabs} />);

    const npmTab = screen.getByRole("tab", { name: "npm" });
    await user.click(npmTab);
    await user.keyboard("{ArrowLeft}");

    expect(npmTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByText("npm install @kuzenbo/code")).toBeDefined();
  });

  it("loops focus navigation by default", async () => {
    const user = userEvent.setup();
    render(<CodeTabs tabs={tabs} />);

    await user.click(screen.getByRole("tab", { name: "npm" }));
    await user.keyboard("{ArrowLeft}");

    const bunTab = screen.getByRole("tab", { name: "bun" });
    expect(bunTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByText("bun add @kuzenbo/code")).toBeDefined();
  });
});
