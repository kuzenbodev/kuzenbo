"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const DEFAULT_COPIED_DURATION_MS = 1600;
const DEFAULT_FAILED_DURATION_MS = 2200;

export type ClipboardStatus = "idle" | "copying" | "copied" | "failed";

export type ClipboardErrorCode =
  | "clipboard-unavailable"
  | "permission-denied"
  | "write-failed"
  | "fallback-failed";

export interface ClipboardResult {
  ok: boolean;
  status: ClipboardStatus;
  errorCode: ClipboardErrorCode | null;
}

export interface UseClipboardOptions {
  copiedDurationMs?: number;
  failedDurationMs?: number;
  useLegacyFallback?: boolean;
}

export interface UseClipboardReturn {
  status: ClipboardStatus;
  errorCode: ClipboardErrorCode | null;
  announcement: string;
  announcementProps: {
    role: "status";
    "aria-live": "polite" | "assertive";
    "aria-atomic": true;
    children: string;
  };
  copy: (value: string) => Promise<ClipboardResult>;
  reset: () => void;
}

const getErrorName = (error: unknown): string | null => {
  if (error instanceof Error && typeof error.name === "string") {
    return error.name;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    typeof (error as { name: unknown }).name === "string"
  ) {
    return (error as { name: string }).name;
  }

  return null;
};

const mapClipboardErrorCode = (error: unknown): ClipboardErrorCode => {
  const errorName = getErrorName(error);

  if (
    errorName === "NotAllowedError" ||
    errorName === "NotReadableError" ||
    errorName === "SecurityError"
  ) {
    return "permission-denied";
  }

  if (errorName === "NotFoundError" || errorName === "NotSupportedError") {
    return "clipboard-unavailable";
  }

  return "write-failed";
};

const getAnnouncement = (
  status: ClipboardStatus,
  errorCode: ClipboardErrorCode | null
): string => {
  if (status === "copying") {
    return "Copying to clipboard.";
  }

  if (status === "copied") {
    return "Copied to clipboard.";
  }

  if (status !== "failed" || errorCode === null) {
    return "";
  }

  if (errorCode === "permission-denied") {
    return "Clipboard permission was denied.";
  }

  if (errorCode === "clipboard-unavailable") {
    return "Clipboard is not available in this environment.";
  }

  return "Failed to copy to clipboard.";
};

const copyWithLegacyExecCommand = (value: string): boolean => {
  if (
    typeof document === "undefined" ||
    typeof document.execCommand !== "function"
  ) {
    return false;
  }

  const targetDocument = document;
  if (!targetDocument.body) {
    return false;
  }

  const textarea = targetDocument.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.left = "-9999px";
  textarea.style.opacity = "0";
  targetDocument.body.append(textarea);

  const selection = targetDocument.getSelection();
  const previousRange =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  let copied = false;
  try {
    copied = targetDocument.execCommand("copy");
  } catch {
    copied = false;
  }

  textarea.remove();

  if (selection && previousRange) {
    selection.removeAllRanges();
    selection.addRange(previousRange);
  }

  return copied;
};

export const useClipboard = ({
  copiedDurationMs = DEFAULT_COPIED_DURATION_MS,
  failedDurationMs = DEFAULT_FAILED_DURATION_MS,
  useLegacyFallback = false,
}: UseClipboardOptions = {}): UseClipboardReturn => {
  const [status, setStatus] = useState<ClipboardStatus>("idle");
  const [errorCode, setErrorCode] = useState<ClipboardErrorCode | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current !== null) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearResetTimer();
    setStatus("idle");
    setErrorCode(null);
  }, [clearResetTimer]);

  const scheduleReset = useCallback(
    (durationMs: number) => {
      clearResetTimer();
      resetTimerRef.current = setTimeout(() => {
        resetTimerRef.current = null;
        setStatus("idle");
        setErrorCode(null);
      }, durationMs);
    },
    [clearResetTimer]
  );

  useEffect(
    () => () => {
      clearResetTimer();
    },
    [clearResetTimer]
  );

  const copy = useCallback(
    async (value: string): Promise<ClipboardResult> => {
      clearResetTimer();
      setStatus("copying");
      setErrorCode(null);

      const clipboardApi =
        typeof navigator === "undefined" ? undefined : navigator.clipboard;

      if (clipboardApi && typeof clipboardApi.writeText === "function") {
        try {
          await clipboardApi.writeText(value);
          setStatus("copied");
          setErrorCode(null);
          scheduleReset(copiedDurationMs);
          return { ok: true, status: "copied", errorCode: null };
        } catch (error) {
          const mappedErrorCode = mapClipboardErrorCode(error);

          if (!useLegacyFallback) {
            setStatus("failed");
            setErrorCode(mappedErrorCode);
            scheduleReset(failedDurationMs);
            return { ok: false, status: "failed", errorCode: mappedErrorCode };
          }

          const fallbackCopied = copyWithLegacyExecCommand(value);
          if (fallbackCopied) {
            setStatus("copied");
            setErrorCode(null);
            scheduleReset(copiedDurationMs);
            return { ok: true, status: "copied", errorCode: null };
          }

          setStatus("failed");
          setErrorCode("fallback-failed");
          scheduleReset(failedDurationMs);
          return { ok: false, status: "failed", errorCode: "fallback-failed" };
        }
      }

      if (!useLegacyFallback) {
        setStatus("failed");
        setErrorCode("clipboard-unavailable");
        scheduleReset(failedDurationMs);
        return {
          ok: false,
          status: "failed",
          errorCode: "clipboard-unavailable",
        };
      }

      const fallbackCopied = copyWithLegacyExecCommand(value);
      if (fallbackCopied) {
        setStatus("copied");
        setErrorCode(null);
        scheduleReset(copiedDurationMs);
        return { ok: true, status: "copied", errorCode: null };
      }

      setStatus("failed");
      setErrorCode("fallback-failed");
      scheduleReset(failedDurationMs);
      return { ok: false, status: "failed", errorCode: "fallback-failed" };
    },
    [
      clearResetTimer,
      copiedDurationMs,
      failedDurationMs,
      scheduleReset,
      useLegacyFallback,
    ]
  );

  const announcement = useMemo(
    () => getAnnouncement(status, errorCode),
    [errorCode, status]
  );

  const announcementProps = useMemo(
    () =>
      ({
        role: "status",
        "aria-live": status === "failed" ? "assertive" : "polite",
        "aria-atomic": true,
        children: announcement,
      }) as const,
    [announcement, status]
  );

  return {
    status,
    errorCode,
    announcement,
    announcementProps,
    copy,
    reset,
  };
};
