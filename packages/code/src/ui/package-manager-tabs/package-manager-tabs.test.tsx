import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";

import { PackageManagerTabs } from "./package-manager-tabs";

afterEach(cleanup);

describe("PackageManagerTabs", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders npm first by default", () => {
    render(
      <PackageManagerTabs>
        {(manager) => <p>{`active:${manager}`}</p>}
      </PackageManagerTabs>
    );

    expect(screen.getByText("active:npm")).toBeDefined();
  });

  it("supports uncontrolled state", () => {
    const onValueChange = mock();

    render(
      <PackageManagerTabs defaultValue="pnpm" onValueChange={onValueChange}>
        {(manager) => <p>{`active:${manager}`}</p>}
      </PackageManagerTabs>
    );

    fireEvent.click(screen.getByRole("tab", { name: "bun" }));

    expect(onValueChange).toHaveBeenCalledWith("bun");
    expect(screen.getByText("active:bun")).toBeDefined();
  });

  it("supports controlled state", () => {
    const onValueChange = mock();

    render(
      <PackageManagerTabs onValueChange={onValueChange} value="yarn">
        {(manager) => <p>{`active:${manager}`}</p>}
      </PackageManagerTabs>
    );

    fireEvent.click(screen.getByRole("tab", { name: "bun" }));

    expect(onValueChange).toHaveBeenCalledWith("bun");
    expect(screen.getByText("active:yarn")).toBeDefined();
  });

  it("reads persisted manager preference when enabled", () => {
    window.localStorage.setItem("pm-pref", "yarn");

    render(
      <PackageManagerTabs persistPreference persistenceKey="pm-pref">
        {(manager) => <p>{`active:${manager}`}</p>}
      </PackageManagerTabs>
    );

    expect(screen.getByText("active:yarn")).toBeDefined();
  });

  it("writes manager preference when persistence is enabled", async () => {
    render(
      <PackageManagerTabs persistPreference persistenceKey="pm-pref">
        {(manager) => <p>{`active:${manager}`}</p>}
      </PackageManagerTabs>
    );

    fireEvent.click(screen.getByRole("tab", { name: "bun" }));

    await waitFor(() => {
      expect(window.localStorage.getItem("pm-pref")).toBe("bun");
    });
  });
});
