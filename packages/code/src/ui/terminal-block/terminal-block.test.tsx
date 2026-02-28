import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { TerminalBlock } from "./terminal-block";

afterEach(cleanup);

describe("TerminalBlock", () => {
  it("renders title, command, and output lines", () => {
    render(
      <TerminalBlock
        command="bun run build"
        output={"Building project...\nDone in 1.24s"}
        title="build"
      />
    );

    expect(screen.getByText("build")).toBeDefined();
    expect(screen.getByText("bun run build")).toBeDefined();
    expect(screen.getByText("Building project...")).toBeDefined();
    expect(screen.getByText("Done in 1.24s")).toBeDefined();
  });

  it("parses ansi color sequences with anser", () => {
    render(
      <TerminalBlock
        output={`${"\u001B[31m"}Error:${"\u001B[0m"} build failed`}
      />
    );

    const coloredChunk = screen.getByText("Error:");
    expect((coloredChunk as HTMLElement).style.color).toContain("rgb");
  });

  it("merges custom className on root", () => {
    render(
      <TerminalBlock
        className="custom-terminal-block"
        output={"Waiting for changes...\n"}
      />
    );

    expect(document.querySelector(".custom-terminal-block")).toBeDefined();
  });
});
