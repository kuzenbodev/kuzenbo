import type { Meta, StoryObj } from "@storybook/react";

import {
  type ComponentProps,
  type FormEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import type { RangeSliderValue } from "../range-slider-types";

import { RangeSlider } from "../range-slider";

type RangeSliderArgs = ComponentProps<typeof RangeSlider>;
interface RangeStoryExtraProps {
  color?: RangeSliderArgs["color"];
  hiddenInputProps?: RangeSliderArgs["hiddenInputProps"];
  labelTransitionProps?: RangeSliderArgs["labelTransitionProps"];
  radius?: RangeSliderArgs["radius"];
  size?: RangeSliderArgs["size"];
}

const defaultRangeValue: RangeSliderValue = [25, 75];

const rangeMarks = [
  { value: 0, label: "0" },
  { value: 20, label: "20" },
  { value: 40, label: "40" },
  { value: 60, label: "60" },
  { value: 80, label: "80" },
  { value: 100, label: "100" },
] as const;

const restrictToMarksRangeMarks = [
  { value: 5, label: "5" },
  { value: 15, label: "15" },
  { value: 35, label: "35" },
  { value: 55, label: "55" },
  { value: 75, label: "75" },
  { value: 95, label: "95" },
] as const;

const noopRangeOnChange: NonNullable<RangeSliderArgs["onChange"]> = (
  nextValue
) => Number.isFinite(nextValue[0]) && Number.isFinite(nextValue[1]);

const noopRangeOnChangeEnd: NonNullable<RangeSliderArgs["onChangeEnd"]> = (
  nextValue
) => Number.isFinite(nextValue[0]) && Number.isFinite(nextValue[1]);
const rangeInputPreviewHelpText =
  "Submit to inspect generated hidden input name/value pairs.";

const RangeSliderContainer = ({ children }: { children: ReactNode }) => (
  <div className="w-80 px-4">{children}</div>
);

const VerticalRangeSliderContainer = ({
  children,
}: {
  children: ReactNode;
}) => (
  <div className="flex h-72 w-24 items-center justify-center px-4">
    {children}
  </div>
);

const withStoryExtraProps = (
  args: RangeSliderArgs,
  extraProps: RangeStoryExtraProps
): RangeSliderArgs =>
  ({
    ...(args as Record<string, unknown>),
    ...extraProps,
  }) as RangeSliderArgs;

const ControlledRangeSlider = ({ args }: { args: RangeSliderArgs }) => {
  const {
    onChange,
    onChangeEnd,
    value: valueFromArgs = defaultRangeValue,
    ...rest
  } = args;
  const [value, setValue] = useState<RangeSliderValue>(valueFromArgs);

  useEffect(() => {
    setValue([valueFromArgs[0], valueFromArgs[1]]);
  }, [valueFromArgs]);

  const handleChange = useCallback(
    (nextValue: RangeSliderValue) => {
      setValue(nextValue);
      onChange?.(nextValue);
    },
    [onChange]
  );

  const handleChangeEnd = useCallback(
    (nextValue: RangeSliderValue) => {
      onChangeEnd?.(nextValue);
    },
    [onChangeEnd]
  );

  return (
    <RangeSlider
      {...rest}
      onChange={handleChange}
      onChangeEnd={handleChangeEnd}
      value={value}
    />
  );
};

export const rangeBaseMeta = {
  title: "Components/RangeSlider",
  component: RangeSlider,
  tags: ["autodocs"],
} satisfies Meta<typeof RangeSlider>;

type RangeStory = StoryObj<typeof rangeBaseMeta>;

export const Default: RangeStory = {
  args: {
    label: (value) => `${Math.round(value)} seats`,
    max: 300,
    min: 0,
    onChange: noopRangeOnChange,
    onChangeEnd: noopRangeOnChangeEnd,
    step: 5,
    value: [60, 180],
  },
  render: (args) => (
    <RangeSliderContainer>
      <ControlledRangeSlider args={args} />
    </RangeSliderContainer>
  ),
};

export const RangeMarks: RangeStory = {
  args: {
    marks: rangeMarks,
    onChange: noopRangeOnChange,
    onChangeEnd: noopRangeOnChangeEnd,
    value: [20, 80],
  },
  render: (args) => (
    <RangeSliderContainer>
      <ControlledRangeSlider args={args} />
    </RangeSliderContainer>
  ),
};

export const RangeMinMaxRange: RangeStory = {
  args: {
    maxRange: 40,
    minRange: 20,
    onChange: noopRangeOnChange,
    onChangeEnd: noopRangeOnChangeEnd,
    value: [30, 60],
  },
  render: (args) => (
    <RangeSliderContainer>
      <ControlledRangeSlider args={args} />
    </RangeSliderContainer>
  ),
};

export const RangePushOnOverlapOn: RangeStory = {
  args: {
    onChange: noopRangeOnChange,
    onChangeEnd: noopRangeOnChangeEnd,
    pushOnOverlap: true,
    value: [35, 55],
  },
  render: (args) => (
    <RangeSliderContainer>
      <ControlledRangeSlider args={args} />
    </RangeSliderContainer>
  ),
};

export const RangePushOnOverlapOff: RangeStory = {
  args: {
    onChange: noopRangeOnChange,
    onChangeEnd: noopRangeOnChangeEnd,
    pushOnOverlap: false,
    value: [35, 55],
  },
  render: (args) => (
    <RangeSliderContainer>
      <ControlledRangeSlider args={args} />
    </RangeSliderContainer>
  ),
};

export const RangeRestrictToMarks: RangeStory = {
  args: {
    marks: restrictToMarksRangeMarks,
    onChange: noopRangeOnChange,
    onChangeEnd: noopRangeOnChangeEnd,
    restrictToMarks: true,
    value: [15, 75],
  },
  render: (args) => (
    <RangeSliderContainer>
      <ControlledRangeSlider args={args} />
    </RangeSliderContainer>
  ),
};

export const RangeDomainScale: RangeStory = {
  args: {
    domain: [-100, 1100],
    label: (value) => `${value.toFixed(1)}k`,
    marks: [
      { label: "0k", value: 0 },
      { label: "5k", value: 500 },
      { label: "10k", value: 1000 },
    ],
    max: 1000,
    min: 0,
    onChange: noopRangeOnChange,
    onChangeEnd: noopRangeOnChangeEnd,
    scale: (value) => value / 100,
    step: 25,
    value: [250, 850],
  },
  render: (args) => (
    <RangeSliderContainer>
      <ControlledRangeSlider args={args} />
    </RangeSliderContainer>
  ),
};

export const RangeLabelTransitionProps: RangeStory = {
  args: {
    label: (value) => `${value}%`,
    onChange: noopRangeOnChange,
    onChangeEnd: noopRangeOnChangeEnd,
    showLabelOnHover: true,
    value: [30, 70],
  },
  render: (args) => (
    <div className="flex w-80 flex-col gap-4 px-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Default thumb label transition
        </p>
        <ControlledRangeSlider args={args} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Custom transition via labelTransitionProps
        </p>
        <ControlledRangeSlider
          args={withStoryExtraProps(args, {
            labelTransitionProps: {
              delay: 40,
              duration: 280,
              timingFunction: "ease-out",
            },
          })}
        />
      </div>
    </div>
  ),
};

const RangeHiddenInputPropsDemo = () => {
  const [submittedEntries, setSubmittedEntries] = useState<string[] | null>(
    null
  );

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextEntries = [...formData.entries()].map(
      ([key, value]) => `${key}=${String(value)}`
    );
    setSubmittedEntries(nextEntries);
  }, []);

  return (
    <form className="flex w-80 flex-col gap-3 px-4" onSubmit={handleSubmit}>
      <ControlledRangeSlider
        args={withStoryExtraProps(
          {
            "aria-label": "Budget range",
            label: (value) => `$${value}`,
            labelAlwaysOn: true,
            name: "budget",
            onChange: noopRangeOnChange,
            onChangeEnd: noopRangeOnChangeEnd,
            value: [20, 80],
          },
          {
            hiddenInputProps: {
              id: "range-slider-hidden-input",
            },
          }
        )}
      />
      <button
        className="inline-flex h-8 items-center justify-center rounded-md border border-border bg-background px-3 text-xs text-foreground transition-colors hover:bg-muted"
        type="submit"
      >
        Read form data
      </button>
      <pre className="rounded-md border border-border bg-muted p-2 text-xs text-muted-foreground">
        {submittedEntries?.length
          ? submittedEntries.join("\n")
          : rangeInputPreviewHelpText}
      </pre>
    </form>
  );
};

export const RangeNameAndHiddenInputProps: RangeStory = {
  render: () => <RangeHiddenInputPropsDemo />,
};

export const RangeColorSizeRadius: RangeStory = {
  args: {
    label: (value) => `${value}%`,
    onChange: noopRangeOnChange,
    onChangeEnd: noopRangeOnChangeEnd,
    value: [25, 75],
  },
  render: (args) => (
    <div className="flex w-80 flex-col gap-4 px-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Default tokens</p>
        <ControlledRangeSlider args={args} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          color/size/radius overrides
        </p>
        <ControlledRangeSlider
          args={withStoryExtraProps(args, {
            color: "success",
            radius: "lg",
            size: "sm",
          })}
        />
      </div>
    </div>
  ),
};

export const RangeEndpointAlignment: RangeStory = {
  args: {
    marks: [
      { label: "min", value: 0 },
      { label: "max", value: 100 },
    ],
    onChange: noopRangeOnChange,
    onChangeEnd: noopRangeOnChangeEnd,
    value: [0, 100],
  },
  render: (args) => (
    <div className="flex w-80 flex-col gap-4 px-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Both endpoints alignment
        </p>
        <ControlledRangeSlider args={args} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Lower endpoint alignment
        </p>
        <ControlledRangeSlider args={{ ...args, value: [0, 40] }} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Upper endpoint alignment
        </p>
        <ControlledRangeSlider args={{ ...args, value: [60, 100] }} />
      </div>
    </div>
  ),
};

export const VerticalRange: RangeStory = {
  args: {
    onChange: noopRangeOnChange,
    onChangeEnd: noopRangeOnChangeEnd,
    orientation: "vertical",
    value: [30, 70],
  },
  render: (args) => (
    <VerticalRangeSliderContainer>
      <ControlledRangeSlider args={args} />
    </VerticalRangeSliderContainer>
  ),
};

export const VerticalRangeMarks: RangeStory = {
  args: {
    marks: rangeMarks,
    onChange: noopRangeOnChange,
    onChangeEnd: noopRangeOnChangeEnd,
    orientation: "vertical",
    value: [20, 80],
  },
  render: (args) => (
    <VerticalRangeSliderContainer>
      <ControlledRangeSlider args={args} />
    </VerticalRangeSliderContainer>
  ),
};

export const VerticalRangeRestrictToMarks: RangeStory = {
  args: {
    marks: restrictToMarksRangeMarks,
    onChange: noopRangeOnChange,
    onChangeEnd: noopRangeOnChangeEnd,
    orientation: "vertical",
    restrictToMarks: true,
    value: [15, 75],
  },
  render: (args) => (
    <VerticalRangeSliderContainer>
      <ControlledRangeSlider args={args} />
    </VerticalRangeSliderContainer>
  ),
};
