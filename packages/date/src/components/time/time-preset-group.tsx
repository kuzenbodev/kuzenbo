import { tv } from "tailwind-variants";

import type {
  TimeAmPmLabels,
  TimeFormat,
  TimePresetGroupData,
} from "./time-picker-types";

import { TimePresetControl } from "./time-preset-control";
import { isSameTime } from "./utils/time-utils";

const timePresetGroupVariants = tv({
  base: "space-y-1",
});

const timePresetGroupLabelVariants = tv({
  base: "text-[10px] font-medium uppercase tracking-wide text-muted-foreground",
});

const timePresetGroupControlsVariants = tv({
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

export interface TimePresetGroupProps {
  data: TimePresetGroupData;
  value: string;
  format: TimeFormat;
  amPmLabels: TimeAmPmLabels;
  withSeconds: boolean;
  onChange: (value: string) => void;
}

const TimePresetGroup = ({
  amPmLabels,
  data,
  format,
  onChange,
  value,
  withSeconds,
}: TimePresetGroupProps) => (
  <div className={timePresetGroupVariants()}>
    <div className={timePresetGroupLabelVariants()}>{data.label}</div>
    <div className={timePresetGroupControlsVariants({ withSeconds })}>
      {data.values.map((presetValue) => (
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

export { TimePresetGroup };
