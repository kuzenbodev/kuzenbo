import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, mock } from "bun:test";

import { type ClipboardResult, useClipboard } from "./use-clipboard";

afterEach(cleanup);

const waitForMs = async (ms: number): Promise<void> => {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const createNamedError = (name: string): Error => {
  const error = new Error(name);
  error.name = name;
  return error;
};

describe("useClipboard", () => {
  let originalClipboardDescriptor: PropertyDescriptor | undefined;
  let originalExecCommandDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
    originalClipboardDescriptor = Object.getOwnPropertyDescriptor(
      navigator,
      "clipboard"
    );
    originalExecCommandDescriptor = Object.getOwnPropertyDescriptor(
      document,
      "execCommand"
    );
  });

  afterEach(() => {
    if (originalClipboardDescriptor) {
      Object.defineProperty(
        navigator,
        "clipboard",
        originalClipboardDescriptor
      );
    } else {
      Reflect.deleteProperty(navigator, "clipboard");
    }

    if (originalExecCommandDescriptor) {
      Object.defineProperty(
        document,
        "execCommand",
        originalExecCommandDescriptor
      );
    } else {
      Reflect.deleteProperty(document, "execCommand");
    }
  });

  const setClipboardWriteText = (
    writeText: (value: string) => Promise<void>
  ): ReturnType<typeof mock> => {
    const writeTextMock = mock(writeText);

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: writeTextMock,
      },
    });

    return writeTextMock;
  };

  const setExecCommand = (
    impl: (command: string) => boolean
  ): ReturnType<typeof mock> => {
    const execCommandMock = mock(impl);

    Object.defineProperty(document, "execCommand", {
      configurable: true,
      writable: true,
      value: execCommandMock,
    });

    return execCommandMock;
  };

  it("returns clipboard state, helpers, and announcement props", () => {
    const { result } = renderHook(() => useClipboard());

    expect(result.current.status).toBe("idle");
    expect(result.current.errorCode).toBeNull();
    expect(result.current.announcement).toBe("");
    expect(result.current.announcementProps).toEqual({
      role: "status",
      "aria-live": "polite",
      "aria-atomic": true,
      children: "",
    });
    expect(typeof result.current.copy).toBe("function");
    expect(typeof result.current.reset).toBe("function");
  });

  it("sets status to copying while clipboard write is pending", async () => {
    let resolveWrite: (() => void) | null = null;
    const writeTextMock = setClipboardWriteText(
      () =>
        new Promise<void>((resolve) => {
          resolveWrite = resolve;
        })
    );

    const { result } = renderHook(() => useClipboard());
    let copyResultPromise!: Promise<ClipboardResult>;

    act(() => {
      copyResultPromise = result.current.copy("hello");
    });

    expect(result.current.status).toBe("copying");

    await act(async () => {
      resolveWrite?.();
      await copyResultPromise;
    });

    expect(writeTextMock).toHaveBeenCalledWith("hello");
    expect(result.current.status).toBe("copied");
  });

  it("copies with writeText and resets to idle after copied timeout", async () => {
    setClipboardWriteText(async () => {
      await Promise.resolve();
    });

    const { result } = renderHook(() => useClipboard({ copiedDurationMs: 10 }));
    let copyResult: ClipboardResult | undefined;

    await act(async () => {
      copyResult = await result.current.copy("kuzenbo");
    });

    expect(copyResult).toEqual({
      ok: true,
      status: "copied",
      errorCode: null,
    });
    expect(result.current.status).toBe("copied");
    expect(result.current.errorCode).toBeNull();
    expect(result.current.announcement).toBe("Copied to clipboard.");

    await act(async () => {
      await waitForMs(20);
    });

    expect(result.current.status).toBe("idle");
    expect(result.current.errorCode).toBeNull();
    expect(result.current.announcement).toBe("");
  });

  it("maps NotAllowedError to permission-denied and resets after failed timeout", async () => {
    setClipboardWriteText(async () => {
      throw createNamedError("NotAllowedError");
    });

    const { result } = renderHook(() => useClipboard({ failedDurationMs: 10 }));
    let copyResult: ClipboardResult | undefined;

    await act(async () => {
      copyResult = await result.current.copy("private");
    });

    expect(copyResult).toEqual({
      ok: false,
      status: "failed",
      errorCode: "permission-denied",
    });
    expect(result.current.status).toBe("failed");
    expect(result.current.errorCode).toBe("permission-denied");
    expect(result.current.announcement).toBe(
      "Clipboard permission was denied."
    );
    expect(result.current.announcementProps["aria-live"]).toBe("assertive");

    await act(async () => {
      await waitForMs(20);
    });

    expect(result.current.status).toBe("idle");
    expect(result.current.errorCode).toBeNull();
  });

  it("fails with clipboard-unavailable when clipboard api is missing and fallback is disabled", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });

    const { result } = renderHook(() =>
      useClipboard({ useLegacyFallback: false })
    );
    let copyResult: ClipboardResult | undefined;

    await act(async () => {
      copyResult = await result.current.copy("hello");
    });

    expect(copyResult).toEqual({
      ok: false,
      status: "failed",
      errorCode: "clipboard-unavailable",
    });
    expect(result.current.errorCode).toBe("clipboard-unavailable");
  });

  it("uses legacy fallback when enabled and clipboard api is missing", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });
    const execCommandMock = setExecCommand(() => true);

    const { result } = renderHook(() =>
      useClipboard({ useLegacyFallback: true })
    );
    let copyResult: ClipboardResult | undefined;

    await act(async () => {
      copyResult = await result.current.copy("legacy");
    });

    expect(execCommandMock).toHaveBeenCalledWith("copy");
    expect(copyResult).toEqual({
      ok: true,
      status: "copied",
      errorCode: null,
    });
    expect(result.current.status).toBe("copied");
  });

  it("uses legacy fallback after writeText fails when enabled", async () => {
    const writeTextMock = setClipboardWriteText(async () => {
      throw createNamedError("UnknownError");
    });
    const execCommandMock = setExecCommand(() => true);

    const { result } = renderHook(() =>
      useClipboard({ useLegacyFallback: true })
    );
    let copyResult: ClipboardResult | undefined;

    await act(async () => {
      copyResult = await result.current.copy("fallback");
    });

    expect(writeTextMock).toHaveBeenCalledWith("fallback");
    expect(execCommandMock).toHaveBeenCalledWith("copy");
    expect(copyResult).toEqual({
      ok: true,
      status: "copied",
      errorCode: null,
    });
  });

  it("returns fallback-failed when legacy fallback is enabled but execCommand fails", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: undefined,
    });
    setExecCommand(() => false);

    const { result } = renderHook(() =>
      useClipboard({ useLegacyFallback: true })
    );
    let copyResult: ClipboardResult | undefined;

    await act(async () => {
      copyResult = await result.current.copy("legacy");
    });

    expect(copyResult).toEqual({
      ok: false,
      status: "failed",
      errorCode: "fallback-failed",
    });
    expect(result.current.status).toBe("failed");
    expect(result.current.errorCode).toBe("fallback-failed");
  });

  it("reset clears status and error immediately", async () => {
    setClipboardWriteText(async () => {
      throw createNamedError("NotSupportedError");
    });

    const { result } = renderHook(() =>
      useClipboard({ failedDurationMs: 1000 })
    );

    await act(async () => {
      await result.current.copy("reset-me");
    });

    expect(result.current.status).toBe("failed");
    expect(result.current.errorCode).toBe("clipboard-unavailable");

    act(() => {
      result.current.reset();
    });

    expect(result.current.status).toBe("idle");
    expect(result.current.errorCode).toBeNull();
    expect(result.current.announcement).toBe("");
  });
});
