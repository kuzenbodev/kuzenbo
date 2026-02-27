import { tv } from "tailwind-variants";

import type {
  TimeAmPmLabels,
  TimeFormat,
  TimePresetGroupData,
  TimePresetsData,
} from "./time-picker-types";

import { TimePresetControl } from "./time-preset-control";
import { TimePresetGroup } from "./time-preset-group";
import { isSameTime } from "./utils/time-utils";

const timePresetsVariants = tv({
  base: "max-h-48 space-y-2 overflow-auto rounded-md border border-border bg-card p-2",
});

const timePresetsGridVariants = tv({
  base: "grid grid-cols-2 gap-1",
  variants: {
    withSeconds: {
      true: "grid-cols-2",
      false: "grid-cols-3",
    },
  },
  defaultVariants: {
    withSeconds: false,
  },
});

const isPresetGroupList = (
  presets: TimePresetsData
): presets is TimePresetGroupData[] =>
  Array.isArray(presets) &&
  presets.length > 0 &&
  typeof presets[0] === "object" &&
  presets[0] !== null &&
  "values" in presets[0];

export interface TimePresetsProps {
  value: string;
  presets: TimePresetsData;
  format: TimeFormat;
  amPmLabels: TimeAmPmLabels;
  withSeconds: boolean;
  onChange: (value: string) => void;
}

const TimePresets = ({
  amPmLabels,
  format,
  onChange,
  presets,
  value,
  withSeconds,
}: TimePresetsProps) => {
  if (presets.length === 0) {
    return null;
  }

  if (!isPresetGroupList(presets)) {
    return (
      <div className={timePresetsVariants()}>
        <div className={timePresetsGridVariants({ withSeconds })}>
          {presets.map((presetValue) => (
            <TimePresetControl
              active={isSameTime({
                compare: value,
                time: presetValue,
                withSeconds,
              })}
              amPmLabels={amPmLabels}
              format={format}
              key={presetValue}
              value={presetValue}
              withSeconds={withSeconds}
              onChange={onChange}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={timePresetsVariants()}>
      {presets.map((group) => (
        <TimePresetGroup
          amPmLabels={amPmLabels}
          data={group}
          format={format}
          key={group.label}
          value={value}
          withSeconds={withSeconds}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export { TimePresets };
