import { createContext, useContext } from "react";

import type { UISize } from "./size-system";

import { DEFAULT_UI_SIZE, resolveSize } from "./resolve-size";
import { useGlobalUISize } from "./size-provider";

export interface SizeContextValue {
  size?: UISize;
}

interface InternalSizeContextValue extends SizeContextValue {
  hasFallbackDefault?: true;
}

export const createSizeContext = (defaultSize: UISize = DEFAULT_UI_SIZE) => {
  const SizeContext = createContext<InternalSizeContextValue>({
    size: defaultSize,
    hasFallbackDefault: true,
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
