import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";

import { CopyButton } from "./copy-button";

const mockClipboard = (writeTextImpl?: (value: string) => Promise<void>) => {
  const writeText = mock((value: string) => {
    if (writeTextImpl) {
      return writeTextImpl(value);
    }

    return Promise.resolve();
  });

  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });

  return writeText;
};

beforeEach(() => {
  mockClipboard();
});

afterEach(cleanup);

describe("CopyButton", () => {
  it("renders command button semantics and accessible live region", () => {
    render(
      <CopyButton value="pnpm add @kuzenbo/core">Copy command</CopyButton>
    );

    const button = screen.getByRole("button");
    const status = document.querySelector("span[role='status'].sr-only");

    expect(button.tagName).toBe("BUTTON");
    expect(button.textContent?.includes("Copy command")).toBe(true);
    expect(button.getAttribute("type")).toBe("button");
    expect(button.getAttribute("aria-pressed")).toBeNull();
    expect(status?.getAttribute("aria-live")).toBe("polite");
    expect(status?.getAttribute("aria-atomic")).toBe("true");
  });

  it("transitions idle -> copying -> copied -> idle for successful copy", async () => {
    const user = userEvent.setup();
    const writeText = mockClipboard(
      () =>
        new Promise((resolve) => {
          setTimeout(resolve, 20);
        })
    );

    render(
      <CopyButton timeout={60} value="pnpm add @kuzenbo/core">
        Copy install command
      </CopyButton>
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(writeText).toHaveBeenCalledWith("pnpm add @kuzenbo/core");
    expect(button.dataset.status).toBe("copying");
    expect(
      button.querySelector("[data-status-icon='copying'][data-active='true']")
    ).not.toBeNull();

    await waitFor(() => {
      expect(button.dataset.status).toBe("copied");
    });

    expect(
      button.querySelector("[data-status-icon='copied'][data-active='true']")
    ).not.toBeNull();

    await waitFor(() => {
      expect(button.dataset.status).toBe("idle");
    });
  });

  it("transitions to failed status when clipboard write rejects", async () => {
    const user = userEvent.setup();
    mockClipboard(async () => {
      throw new Error("Permission denied");
    });

    render(
      <CopyButton timeout={40} value="token">
        Copy token
      </CopyButton>
    );

    const button = screen.getByRole("button");

    await user.click(button);

    await waitFor(() => {
      expect(button.dataset.status).toBe("failed");
    });

    expect(
      button.querySelector("[data-status-icon='failed'][data-active='true']")
    ).not.toBeNull();
    expect(
      document
        .querySelector("span[role='status'].sr-only")
        ?.getAttribute("aria-live")
    ).toBe("assertive");
  });

  it("supports controlled status via status + onStatusChange", async () => {
    const user = userEvent.setup();
    const handleStatusChange = mock();

    render(
      <CopyButton
        onStatusChange={handleStatusChange}
        status="idle"
        value="controlled"
      >
        Controlled copy
      </CopyButton>
    );

    const button = screen.getByRole("button");

    await user.click(button);

    expect(button.dataset.status).toBe("idle");
    expect(handleStatusChange).toHaveBeenCalledWith("copying");

    await waitFor(() => {
      expect(handleStatusChange).toHaveBeenCalledWith("copied");
    });
  });
});
