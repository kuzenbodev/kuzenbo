import type { MouseEvent, KeyboardEvent } from "react";

import type { ControlKeydownPayload, DateStringValue } from "./general-types";

export interface ControlsGroupSettings {
  __getControlRef?: (
    rowIndex: number,
    cellIndex: number,
    node: HTMLButtonElement | null
  ) => void;
  __onControlClick?: (
    event: MouseEvent<HTMLButtonElement>,
    date: DateStringValue
  ) => void;
  __onControlKeyDown?: (
    event: KeyboardEvent<HTMLButtonElement>,
    payload: ControlKeydownPayload
  ) => void;
  __onControlMouseEnter?: (
    event: MouseEvent<HTMLButtonElement>,
    date: DateStringValue
  ) => void;
  locale?: string;
  maxDate?: DateStringValue | Date;
  minDate?: DateStringValue | Date;
}
