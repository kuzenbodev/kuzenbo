import type { CalendarLevel } from "../../types";

type LevelNumber = 0 | 1 | 2;

const levelToNumber = (
  level: CalendarLevel | undefined,
  fallback: LevelNumber
): LevelNumber => {
  if (!level) {
    return fallback;
  }

  if (level === "month") {
    return 0;
  }

  if (level === "year") {
    return 1;
  }

  return 2;
};

const numberToLevel = (level: LevelNumber): CalendarLevel => {
  if (level === 0) {
    return "month";
  }

  if (level === 1) {
    return "year";
  }

  return "decade";
};

export const clampLevel = (
  level?: CalendarLevel,
  minLevel?: CalendarLevel,
  maxLevel?: CalendarLevel
): CalendarLevel => {
  const levelNumber = levelToNumber(level, 0);
  const minNumber = levelToNumber(minLevel, 0);
  const maxNumber = levelToNumber(maxLevel, 2);

  const clamped = Math.min(
    Math.max(levelNumber, minNumber),
    maxNumber
  ) as LevelNumber;

  return numberToLevel(clamped);
};
