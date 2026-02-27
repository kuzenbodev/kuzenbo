export type TimeFormat = "12h" | "24h";

export interface TimeAmPmLabels {
  am: string;
  pm: string;
}

export interface TimePasteSplitInput {
  time: string;
  format: TimeFormat;
  amPmLabels: TimeAmPmLabels;
}

export interface TimePasteSplitReturn {
  hours: number | null;
  minutes: number | null;
  seconds: number | null;
  amPm: string | null;
}

export type TimePasteSplit = (
  input: TimePasteSplitInput
) => TimePasteSplitReturn;

export interface TimePresetGroupData {
  label: string;
  values: string[];
}

export type TimePresetsData = string[] | TimePresetGroupData[];

export type TimeDisablePredicate = string[] | ((time: string) => boolean);
