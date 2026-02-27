import type { DateSelectionModeInput } from "../types";
import type { DatePickerType } from "./types";

import { normalizeDateSelectionMode } from "../utils";

export const resolvePickerType = (
  selectionMode: DateSelectionModeInput | undefined
): DatePickerType => {
  const normalizedSelectionMode = normalizeDateSelectionMode(selectionMode);

  if (normalizedSelectionMode === "single") {
    return "default";
  }

  return normalizedSelectionMode;
};
