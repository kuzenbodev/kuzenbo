import type { KeyboardEvent, RefObject } from "react";

type ControlsRef = RefObject<HTMLButtonElement[][][] | null>;
type Direction = "down" | "left" | "right" | "up";
type LayoutDirection = "ltr" | "rtl";

interface ShiftFocusInput {
  cellIndex: number;
  controlsRef: ControlsRef;
  direction: Direction;
  levelIndex: number;
  rowIndex: number;
  size: number[][];
}

const getDirection = (
  key: KeyboardEvent<HTMLButtonElement>["key"],
  direction: LayoutDirection
): Direction | null => {
  const horizontalDirection = (value: "left" | "right"): Direction => {
    if (direction === "rtl") {
      return value === "left" ? "right" : "left";
    }

    return value;
  };

  switch (key) {
    case "ArrowDown": {
      return "down";
    }
    case "ArrowLeft": {
      return horizontalDirection("left");
    }
    case "ArrowRight": {
      return horizontalDirection("right");
    }
    case "ArrowUp": {
      return "up";
    }
    default: {
      return null;
    }
  }
};

const getControlsSize = (controlsRef: ControlsRef): number[][] =>
  controlsRef.current?.map((column) => column.map((row) => row.length)) ?? [];

const getNextIndex = ({
  cellIndex,
  direction,
  levelIndex,
  rowIndex,
  size,
}: Omit<ShiftFocusInput, "controlsRef">): {
  cellIndex: number;
  levelIndex: number;
  rowIndex: number;
} | null => {
  switch (direction) {
    case "up": {
      if (levelIndex === 0 && rowIndex === 0) {
        return null;
      }

      if (rowIndex === 0) {
        const previousLevelRows = size[levelIndex - 1];
        if (!previousLevelRows || previousLevelRows.length === 0) {
          return null;
        }

        const previousRowLength = previousLevelRows.at(-1) ?? 1;
        const targetRow =
          cellIndex <= previousRowLength - 1
            ? previousLevelRows.length - 1
            : previousLevelRows.length - 2;

        return {
          cellIndex,
          levelIndex: levelIndex - 1,
          rowIndex: Math.max(0, targetRow),
        };
      }

      return {
        cellIndex,
        levelIndex,
        rowIndex: rowIndex - 1,
      };
    }

    case "down": {
      const currentLevelRows = size[levelIndex];
      if (!currentLevelRows) {
        return null;
      }

      if (rowIndex === currentLevelRows.length - 1) {
        return { cellIndex, levelIndex: levelIndex + 1, rowIndex: 0 };
      }

      if (
        rowIndex === currentLevelRows.length - 2 &&
        cellIndex >= (currentLevelRows.at(-1) ?? 0)
      ) {
        return { cellIndex, levelIndex: levelIndex + 1, rowIndex: 0 };
      }

      return {
        cellIndex,
        levelIndex,
        rowIndex: rowIndex + 1,
      };
    }

    case "left": {
      if (levelIndex === 0 && rowIndex === 0 && cellIndex === 0) {
        return null;
      }

      if (rowIndex === 0 && cellIndex === 0) {
        const previousLevelRows = size[levelIndex - 1];
        if (!previousLevelRows || previousLevelRows.length === 0) {
          return null;
        }

        const lastRowIndex = previousLevelRows.length - 1;
        const lastRowLength = previousLevelRows[lastRowIndex] ?? 1;
        return {
          cellIndex: lastRowLength - 1,
          levelIndex: levelIndex - 1,
          rowIndex: lastRowIndex,
        };
      }

      if (cellIndex === 0) {
        const currentLevelRows = size[levelIndex];
        const previousRowLength = currentLevelRows?.[rowIndex - 1] ?? 1;
        return {
          cellIndex: previousRowLength - 1,
          levelIndex,
          rowIndex: rowIndex - 1,
        };
      }

      return {
        cellIndex: cellIndex - 1,
        levelIndex,
        rowIndex,
      };
    }

    case "right": {
      const currentLevelRows = size[levelIndex];
      const currentRowLength = currentLevelRows?.[rowIndex] ?? 0;

      if (
        rowIndex === (currentLevelRows?.length ?? 1) - 1 &&
        cellIndex === currentRowLength - 1
      ) {
        return { cellIndex: 0, levelIndex: levelIndex + 1, rowIndex: 0 };
      }

      if (cellIndex === currentRowLength - 1) {
        return {
          cellIndex: 0,
          levelIndex,
          rowIndex: rowIndex + 1,
        };
      }

      return {
        cellIndex: cellIndex + 1,
        levelIndex,
        rowIndex,
      };
    }

    default: {
      return null;
    }
  }
};

const focusOnNextFocusableControl = ({
  cellIndex,
  controlsRef,
  direction,
  levelIndex,
  rowIndex,
  size,
}: ShiftFocusInput): void => {
  const nextIndex = getNextIndex({
    cellIndex,
    direction,
    levelIndex,
    rowIndex,
    size,
  });

  if (!nextIndex) {
    return;
  }

  const nextControl =
    controlsRef.current?.[nextIndex.levelIndex]?.[nextIndex.rowIndex]?.[
      nextIndex.cellIndex
    ];

  if (!nextControl) {
    return;
  }

  if (
    nextControl.disabled ||
    nextControl.dataset.hidden === "true" ||
    nextControl.dataset.outside === "true"
  ) {
    focusOnNextFocusableControl({
      cellIndex: nextIndex.cellIndex,
      controlsRef,
      direction,
      levelIndex: nextIndex.levelIndex,
      rowIndex: nextIndex.rowIndex,
      size,
    });
    return;
  }

  nextControl.focus();
};

interface HandleControlKeyDownInput {
  cellIndex: number;
  controlsRef: ControlsRef;
  direction?: LayoutDirection;
  event: KeyboardEvent<HTMLButtonElement>;
  levelIndex: number;
  rowIndex: number;
}

export const handleControlKeyDown = ({
  cellIndex,
  controlsRef,
  direction = "ltr",
  event,
  levelIndex,
  rowIndex,
}: HandleControlKeyDownInput): void => {
  const keyDirection = getDirection(event.key, direction);
  if (!keyDirection) {
    return;
  }

  event.preventDefault();

  const size = getControlsSize(controlsRef);
  focusOnNextFocusableControl({
    cellIndex,
    controlsRef,
    direction: keyDirection,
    levelIndex,
    rowIndex,
    size,
  });
};
