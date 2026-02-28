import { useCallback, useRef, useState } from "react";

export interface UseClipboardInput {
  /** Time in ms after which the copied state will reset, `2000` by default */
  timeout?: number;
}

export interface UseClipboardReturnValue {
  /** Function to copy value to clipboard */
  copy: (value: string) => Promise<void>;

  /** Function to reset copied state and error */
  reset: () => void;

  /** Error if copying failed */
  error: Error | null;

  /** Boolean indicating if the value was copied successfully */
  copied: boolean;
}

/**
 * Provides clipboard helpers and tracks whether the last copy action succeeded.
 * The `copied` flag automatically resets after the configured timeout.
 *
 * @param {UseClipboardInput | undefined} options Optional clipboard behavior configuration.
 * @param {number | undefined} options.timeout Time in milliseconds before `copied` resets to `false`. Defaults to `2000`.
 */
export const useClipboard = (
  options?: UseClipboardInput
): UseClipboardReturnValue => {
  const timeout = options?.timeout ?? 2000;

  const [error, setError] = useState<Error | null>(null);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);

  const clearCopyTimeout = useCallback(() => {
    if (copyTimeoutRef.current !== null) {
      window.clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = null;
    }
  }, []);

  const handleCopyResult = useCallback(
    (value: boolean) => {
      clearCopyTimeout();
      copyTimeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, timeout);
      setCopied(value);
    },
    [clearCopyTimeout, timeout]
  );

  const copy = useCallback(
    async (value: string) => {
      if (!("clipboard" in navigator)) {
        setError(
          new Error("useClipboard: navigator.clipboard is not supported")
        );
        return;
      }

      try {
        await navigator.clipboard.writeText(value);
        handleCopyResult(true);
      } catch (copyError) {
        setError(copyError as Error);
      }
    },
    [handleCopyResult]
  );

  const reset = useCallback(() => {
    setCopied(false);
    setError(null);
    clearCopyTimeout();
  }, [clearCopyTimeout]);

  return { copy, reset, error, copied };
};

export type UseClipboardInputType = UseClipboardInput;
export type UseClipboardReturn = UseClipboardReturnValue;
