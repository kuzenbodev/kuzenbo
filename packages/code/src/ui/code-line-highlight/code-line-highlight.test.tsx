import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "bun:test";

import { CodeLineHighlight } from "./code-line-highlight";

afterEach(cleanup);

const sampleCode = `import { createServer } from "node:http";

const server = createServer();
server.listen(3000);`;

describe("CodeLineHighlight", () => {
  it("renders code lines with line numbers", () => {
    render(<CodeLineHighlight code={sampleCode} startLineNumber={10} />);

    expect(
      document.querySelector(
        "[data-slot=code-line-number][data-line-number='10']"
      )
    ).toBeDefined();
    expect(
      document.querySelector(
        "[data-slot=code-line-number][data-line-number='12']"
      )
    ).toBeDefined();
    expect(screen.getByText("const server = createServer();")).toBeDefined();
  });

  it("marks configured lines as highlighted", () => {
    render(
      <CodeLineHighlight
        code={sampleCode}
        highlightedLines={[11]}
        startLineNumber={10}
      />
    );

    const highlightedRow = document.querySelector(
      "[data-slot=code-line-highlight-row][data-line-number='11']"
    ) as HTMLElement;

    expect(highlightedRow.dataset.highlighted).toBe("true");
  });

  it("renders default annotation content", () => {
    render(
      <CodeLineHighlight
        annotations={[
          {
            line: 12,
            content: "Boots the HTTP server",
          },
        ]}
        code={sampleCode}
        startLineNumber={10}
      />
    );

    expect(screen.getByText("Boots the HTTP server")).toBeDefined();
  });

  it("supports custom annotation slot rendering", () => {
    render(
      <CodeLineHighlight
        annotationSlot={({ lineNumber }) => `Line ${lineNumber}`}
        annotations={[
          {
            line: 12,
            content: "Ignored by custom slot",
          },
        ]}
        code={sampleCode}
        startLineNumber={10}
      />
    );

    expect(screen.getByText("Line 12")).toBeDefined();
  });

  it("merges custom className on root", () => {
    render(
      <CodeLineHighlight className="custom-code-lines" code={sampleCode} />
    );

    expect(document.querySelector(".custom-code-lines")).toBeDefined();
  });
});
