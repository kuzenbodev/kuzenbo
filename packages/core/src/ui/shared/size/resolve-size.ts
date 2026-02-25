import type { UISize } from "./size-system";

const DEFAULT_UI_SIZE: UISize = "md";

export const resolveSize = (
  ...candidates: (UISize | undefined | null)[]
): UISize => {
  for (const candidate of candidates) {
    if (candidate !== undefined && candidate !== null) {
      return candidate;
    }
  }

  return DEFAULT_UI_SIZE;
};

export { DEFAULT_UI_SIZE };
