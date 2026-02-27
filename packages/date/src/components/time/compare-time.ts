import { timeToSeconds } from "./time-utils";

export const isTimeBefore = (value: string, compareTo: string): boolean =>
  timeToSeconds(value) < timeToSeconds(compareTo);

export const isTimeAfter = (value: string, compareTo: string): boolean =>
  timeToSeconds(value) > timeToSeconds(compareTo);
