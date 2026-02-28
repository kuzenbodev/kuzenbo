import { useEffect, useState } from "react";

import { useWindowEvent } from "../use-window-event/use-window-event";

export interface UseHashInput {
  getInitialValueInEffect?: boolean;
}

export type UseHashReturnValue = [string, (value: string) => void];

/**
 * Synchronizes React state with `window.location.hash` and updates state on browser hash changes.
 * The setter always writes a normalized value prefixed with `#`.
 *
 * @param {UseHashInput} options Configuration for when the initial hash value should be read.
 * @param {boolean | undefined} options.getInitialValueInEffect If `true`, reads the initial hash in an effect to avoid render-time access.
 */
export const useHash = ({
  getInitialValueInEffect = true,
}: UseHashInput = {}): UseHashReturnValue => {
  const [hash, setHash] = useState<string>(
    getInitialValueInEffect ? "" : window.location.hash || ""
  );

  const setHashHandler = (value: string) => {
    const valueWithHash = value.startsWith("#") ? value : `#${value}`;
    window.location.hash = valueWithHash;
    setHash(valueWithHash);
  };

  useWindowEvent("hashchange", () => {
    const newHash = window.location.hash;
    if (hash !== newHash) {
      setHash(newHash);
    }
  });

  useEffect(() => {
    if (getInitialValueInEffect) {
      setHash(window.location.hash);
    }
  }, [getInitialValueInEffect]);

  return [hash, setHashHandler];
};

export type UseHashOptions = UseHashInput;
export type UseHashReturn = UseHashReturnValue;
