import { afterEach, describe, expect, it } from "bun:test";

import { cleanup, render, screen } from "@testing-library/react";

import { CodeDiffBlock } from "./code-diff-block";

afterEach(cleanup);

describe("CodeDiffBlock", () => {
  it("renders titles and diff summary counts", () => {
    render(
      <CodeDiffBlock
        newCode={
          "const value = 2;\nconsole.info(value);\nconst ready = true;\n"
        }
        newTitle="feature/docs"
        oldCode={"const value = 1;\nconsole.log(value);\n"}
        oldTitle="main"
      />
    );

    expect(screen.getByText("main")).toBeDefined();
    expect(screen.getByText("feature/docs")).toBeDefined();
    expect(
      document
        .querySelector("[data-slot=code-diff-added-count]")
        ?.textContent?.trim()
    ).toBe("+3");
    expect(
      document
        .querySelector("[data-slot=code-diff-removed-count]")
        ?.textContent?.trim()
    ).toBe("-2");
  });

  it("supports unified mode and custom className", () => {
    render(
      <CodeDiffBlock
        className="custom-diff-block"
        newCode={"const ready = true;\n"}
        oldCode={"const ready = false;\n"}
        viewMode="unified"
      />
    );

    const root = document.querySelector(
      "[data-slot=code-diff-block]"
    ) as HTMLElement;
    expect(root).toBeDefined();
    expect(root.dataset.viewMode).toBe("unified");
    expect(root.className).toContain("custom-diff-block");
  });

  it("shows zero counts when code is unchanged", () => {
    render(
      <CodeDiffBlock
        newCode={"const same = true;\n"}
        oldCode={"const same = true;\n"}
      />
    );

    expect(
      document
        .querySelector("[data-slot=code-diff-added-count]")
        ?.textContent?.trim()
    ).toBe("+0");
    expect(
      document
        .querySelector("[data-slot=code-diff-removed-count]")
        ?.textContent?.trim()
    ).toBe("-0");
  });
});
