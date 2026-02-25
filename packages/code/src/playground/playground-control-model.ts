export type PlaygroundControlType =
  | "boolean"
  | "select"
  | "segmented"
  | "number"
  | "string"
  | "color"
  | "size";

export interface PlaygroundControlOption<TValue extends string = string> {
  label: string;
  value: TValue;
}

export type PlaygroundSelectableOption<TValue extends string = string> =
  | TValue
  | PlaygroundControlOption<TValue>;

interface PlaygroundControlBase<
  TType extends PlaygroundControlType,
  TProp extends string,
  TValue,
> {
  type: TType;
  prop: TProp;
  label?: string;
  initialValue: TValue;
  defaultValue: TValue;
  locked?: boolean;
}

export type PlaygroundBooleanControl<TProp extends string = string> =
  PlaygroundControlBase<"boolean", TProp, boolean>;

export type PlaygroundSelectControl<
  TProp extends string = string,
  TValue extends string = string,
> = PlaygroundControlBase<"select", TProp, TValue> & {
  options: readonly PlaygroundSelectableOption<TValue>[];
};

export type PlaygroundSegmentedControl<
  TProp extends string = string,
  TValue extends string = string,
> = PlaygroundControlBase<"segmented", TProp, TValue> & {
  options: readonly PlaygroundSelectableOption<TValue>[];
  transformLabels?: boolean;
};

export type PlaygroundNumberControl<TProp extends string = string> =
  PlaygroundControlBase<"number", TProp, number> & {
    min?: number;
    max?: number;
    step?: number;
  };

export type PlaygroundStringControl<TProp extends string = string> =
  PlaygroundControlBase<"string", TProp, string>;

export type PlaygroundColorControl<TProp extends string = string> =
  PlaygroundControlBase<"color", TProp, string> & {
    swatches?: readonly string[];
  };

export type PlaygroundSizeControl<
  TProp extends string = string,
  TValue extends string = string,
> = PlaygroundControlBase<"size", TProp, TValue> & {
  values?: readonly TValue[];
};

export type PlaygroundControl =
  | PlaygroundBooleanControl
  | PlaygroundSelectControl
  | PlaygroundSegmentedControl
  | PlaygroundNumberControl
  | PlaygroundStringControl
  | PlaygroundColorControl
  | PlaygroundSizeControl;

export type PlaygroundControlProp<TControl extends PlaygroundControl> =
  TControl["prop"];

export type PlaygroundControlValue<TControl extends PlaygroundControl> =
  TControl extends PlaygroundBooleanControl
    ? boolean
    : TControl extends PlaygroundSelectControl
      ? string
      : TControl extends PlaygroundSegmentedControl
        ? string
        : TControl extends PlaygroundNumberControl
          ? number
          : TControl extends PlaygroundStringControl
            ? string
            : TControl extends PlaygroundColorControl
              ? string
              : TControl extends PlaygroundSizeControl
                ? string
                : never;

export type PlaygroundStateFromControls<
  TControls extends readonly PlaygroundControl[],
> = {
  [TControl in TControls[number] as PlaygroundControlProp<TControl>]: PlaygroundControlValue<TControl>;
};

export type PlaygroundPropKeyFromControls<
  TControls extends readonly PlaygroundControl[],
> = keyof PlaygroundStateFromControls<TControls>;

export type PlaygroundControlByProp<
  TControls extends readonly PlaygroundControl[],
  TProp extends PlaygroundPropKeyFromControls<TControls>,
> = Extract<TControls[number], { prop: TProp }>;

export type PlaygroundControlValueByProp<
  TControls extends readonly PlaygroundControl[],
  TProp extends PlaygroundPropKeyFromControls<TControls>,
> = PlaygroundControlValue<PlaygroundControlByProp<TControls, TProp>>;

export const definePlaygroundControls = <
  const TControls extends readonly PlaygroundControl[],
>(
  controls: TControls
): TControls => controls;
