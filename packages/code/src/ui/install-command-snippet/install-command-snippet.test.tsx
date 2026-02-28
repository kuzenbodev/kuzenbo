import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import { InstallCommandSnippet } from "./install-command-snippet";

afterEach(cleanup);

describe("InstallCommandSnippet", () => {
  let writeTextMock: ReturnType<typeof mock>;

  beforeEach(() => {
    writeTextMock = mock(async () => {
      await Promise.resolve();
    });

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: writeTextMock,
      },
    });
  });

  it("renders npm install command by default", () => {
    render(
      <InstallCommandSnippet packages={["@kuzenbo/code", "@kuzenbo/theme"]} />
    );

    expect(
      screen.getByText("npm install @kuzenbo/code @kuzenbo/theme")
    ).toBeDefined();
  });

  it("updates command when package manager changes", () => {
    render(
      <InstallCommandSnippet packages={["@kuzenbo/code", "@kuzenbo/theme"]} />
    );

    fireEvent.click(screen.getByRole("tab", { name: "pnpm" }));

    expect(
      screen.getByText("pnpm add @kuzenbo/code @kuzenbo/theme")
    ).toBeDefined();
  });

  it("supports controlled package manager value", () => {
    const onValueChange = mock();

    render(
      <InstallCommandSnippet
        onValueChange={onValueChange}
        packages={["@kuzenbo/code", "@kuzenbo/theme"]}
        value="yarn"
      />
    );

    fireEvent.click(screen.getByRole("tab", { name: "bun" }));

    expect(onValueChange).toHaveBeenCalledWith("bun");
    expect(
      screen.getByText("yarn add @kuzenbo/code @kuzenbo/theme")
    ).toBeDefined();
  });

  it("supports command overrides", () => {
    render(
      <InstallCommandSnippet
        commands={{ npm: "npm i @kuzenbo/code @kuzenbo/theme --save" }}
        packages={["@kuzenbo/code", "@kuzenbo/theme"]}
      />
    );

    expect(
      screen.getByText("npm i @kuzenbo/code @kuzenbo/theme --save")
    ).toBeDefined();
  });

  it("copies active command", async () => {
    render(
      <InstallCommandSnippet packages={["@kuzenbo/code", "@kuzenbo/theme"]} />
    );

    fireEvent.click(screen.getByRole("button", { name: /Copy/i }));

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalledWith(
        "npm install @kuzenbo/code @kuzenbo/theme"
      );
    });
  });
});
