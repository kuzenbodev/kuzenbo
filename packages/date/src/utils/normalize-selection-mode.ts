import type { DateSelectionMode } from "../types";

export const normalizeDateSelectionMode = (
  selectionMode?: DateSelectionMode
): DateSelectionMode => selectionMode ?? "single";

export const resolveDateSelectionMode = (
  selectionMode?: DateSelectionMode
): DateSelectionMode => normalizeDateSelectionMode(selectionMode);
