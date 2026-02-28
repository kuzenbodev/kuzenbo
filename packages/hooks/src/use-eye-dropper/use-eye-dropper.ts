import { useCallback, useState } from "react";

import { useIsomorphicEffect } from "../use-isomorphic-effect/use-isomorphic-effect";

export interface EyeDropperOpenOptions {
  signal?: AbortSignal;
}

export interface EyeDropperOpenReturnType {
  sRGBHex: string;
}

export interface UseEyeDropperReturnValue {
  supported: boolean;
  open: (
    options?: EyeDropperOpenOptions
  ) => Promise<EyeDropperOpenReturnType | null>;
}

interface EyeDropperApi {
  open(options?: EyeDropperOpenOptions): Promise<EyeDropperOpenReturnType>;
}

interface WindowWithEyeDropper extends Window {
  EyeDropper: new () => EyeDropperApi;
}

const isOpera = (): boolean => navigator.userAgent.includes("OPR");

/**
 * Exposes browser EyeDropper support state and a method to open the picker.
 *
 * On unsupported browsers, `open` resolves to `null` instead of throwing.
 *
 */
export const useEyeDropper = (): UseEyeDropperReturnValue => {
  const [supported, setSupported] = useState(false);

  useIsomorphicEffect(() => {
    setSupported(
      typeof window !== "undefined" && !isOpera() && "EyeDropper" in window
    );
  }, []);

  const open = useCallback(
    (
      options: EyeDropperOpenOptions = {}
    ): Promise<EyeDropperOpenReturnType | null> => {
      if (supported) {
        const eyeDropper = new (
          window as unknown as WindowWithEyeDropper
        ).EyeDropper();
        return eyeDropper.open(options);
      }

      return Promise.resolve(null);
    },
    [supported]
  );

  return { supported, open };
};
