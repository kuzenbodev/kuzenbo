import type {
  DatePickerType,
  DateSelectionMode,
  DateSelectionModeInput,
} from "../types";

export const normalizeDateSelectionMode = (
  selectionMode: DateSelectionModeInput | undefined
): DateSelectionMode => {
  if (selectionMode === undefined || selectionMode === "single") {
    return "single";
  }

  if (selectionMode === "default") {
    return "single";
  }

  return selectionMode;
};

export const resolveDateSelectionMode = ({
  selectionMode,
  type,
}: {
  selectionMode?: DateSelectionMode;
  type?: DatePickerType;
}): DateSelectionMode => {
  if (selectionMode) {
    return normalizeDateSelectionMode(selectionMode);
  }

  return normalizeDateSelectionMode(type);
};
