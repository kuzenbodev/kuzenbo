import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, mock } from "bun:test";

import { CodeTabs } from "./code-tabs";

afterEach(cleanup);

describe("CodeTabs", () => {
  const tabs = [
    {
      value: "npm",
      label: "npm",
      content: <code>npm install @kuzenbo/code</code>,
    },
    {
      value: "pnpm",
      label: "pnpm",
      content: <code>pnpm add @kuzenbo/code</code>,
    },
    {
      value: "bun",
      label: "bun",
      content: <code>bun add @kuzenbo/code</code>,
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

  it("supports keyboard activation", () => {
    render(<CodeTabs tabs={tabs} />);

    const pnpmTab = screen.getByRole("tab", { name: "pnpm" });
    fireEvent.keyDown(pnpmTab, { key: "Enter" });

    expect(screen.getByText("pnpm add @kuzenbo/code")).toBeDefined();
  });
});
