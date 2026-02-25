import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, mock } from "bun:test";

import { CodePreview } from "./code-preview";

afterEach(cleanup);

describe("CodePreview", () => {
  const preview = <div>Rendered preview</div>;
  const code = <code>full source code</code>;
  const minimalCode = <code>minimal source code</code>;

  it("renders preview mode by default", () => {
    render(<CodePreview code={code} preview={preview} />);

    expect(screen.getByText("Rendered preview")).toBeDefined();
    expect(screen.queryByText("full source code")).toBeNull();
  });

  it("supports mode switching", () => {
    render(<CodePreview code={code} preview={preview} />);

    fireEvent.click(screen.getByRole("button", { name: /Code/i }));
    expect(screen.getByText("full source code")).toBeDefined();
    expect(screen.queryByText("Rendered preview")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /Split/i }));
    expect(screen.getByText("Rendered preview")).toBeDefined();
    expect(screen.getByText("full source code")).toBeDefined();
  });

  it("supports code mode minimal and full", () => {
    render(
      <CodePreview
        code={code}
        defaultMode="code"
        minimalCode={minimalCode}
        preview={preview}
      />
    );

    expect(screen.getByText("minimal source code")).toBeDefined();
    expect(screen.queryByText("full source code")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /Full/i }));

    expect(screen.getByText("full source code")).toBeDefined();
  });

  it("supports controlled mode", () => {
    const onModeChange = mock();

    render(
      <CodePreview
        code={code}
        mode="preview"
        onModeChange={onModeChange}
        preview={preview}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Code/i }));

    expect(onModeChange).toHaveBeenCalledWith("code");
    expect(screen.getByText("Rendered preview")).toBeDefined();
  });

  it("supports controlled code mode", () => {
    const onCodeModeChange = mock();

    render(
      <CodePreview
        code={code}
        codeMode="minimal"
        defaultMode="code"
        minimalCode={minimalCode}
        onCodeModeChange={onCodeModeChange}
        preview={preview}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /Full/i }));

    expect(onCodeModeChange).toHaveBeenCalledWith("full");
    expect(screen.getByText("minimal source code")).toBeDefined();
  });
});
