"use client";

import { createContext, useContext } from "react";

import { DEFAULT_UI_SIZE, resolveSize } from "./resolve-size";
import { useGlobalUISize } from "./size-provider";
import type { UISize } from "./size-system";

export interface SizeContextValue {
  size?: UISize;
}

export const createSizeContext = (defaultSize: UISize = DEFAULT_UI_SIZE) => {
  const SizeContext = createContext<
    SizeContextValue & {
      hasFallbackDefault?: true;
    }
  >({
    hasFallbackDefault: true,
    size: defaultSize,
  });

  const useResolvedSize = (...candidates: (UISize | undefined | null)[]) => {
    const [explicitCandidate, ...contextAfterCandidates] = candidates;
    const { hasFallbackDefault, size: contextSize } = useContext(SizeContext);
    const localSize = hasFallbackDefault ? undefined : contextSize;
    const globalSize = useGlobalUISize();

    return resolveSize(
      explicitCandidate,
      localSize,
      ...contextAfterCandidates,
      globalSize,
      defaultSize
    );
  };

  return { SizeContext, useResolvedSize };
};
