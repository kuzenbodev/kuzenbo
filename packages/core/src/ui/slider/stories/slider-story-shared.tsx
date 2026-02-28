import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useEffect, useState } from "react";
import type { ComponentProps, FormEvent, ReactNode } from "react";

import { Slider } from "../slider";

type SingleSliderArgs = ComponentProps<typeof Slider>;
interface SliderStoryExtraProps {
  color?: SingleSliderArgs["color"];
  hiddenInputProps?: SingleSliderArgs["hiddenInputProps"];
  labelTransitionProps?: SingleSliderArgs["labelTransitionProps"];
  radius?: SingleSliderArgs["radius"];
  size?: SingleSliderArgs["size"];
}

const defaultSingleValue = 45;

const singleMarks = [
  { label: "0%", value: 0 },
  { label: "25%", value: 25 },
  { label: "50%", value: 50 },
  { label: "75%", value: 75 },
  { label: "100%", value: 100 },
] as const;

const restrictToMarksSingleMarks = [
  { label: "XS", value: 10 },
  { label: "S", value: 30 },
  { label: "M", value: 55 },
  { label: "L", value: 75 },
  { label: "XL", value: 95 },
] as const;

const noopSingleOnChange: NonNullable<SingleSliderArgs["onChange"]> = (
  nextValue
) => Number.isFinite(nextValue);

const noopSingleOnChangeEnd: NonNullable<SingleSliderArgs["onChangeEnd"]> = (
  nextValue
) => Number.isFinite(nextValue);

const scaleLabel = (value: number) => `${value.toFixed(1)}k req/min`;
const singleInputPreviewHelpText =
  "Submit to inspect generated hidden input name/value pairs.";

const SliderContainer = ({ children }: { children: ReactNode }) => (
  <div className="w-80 px-4">{children}</div>
);

const VerticalSliderContainer = ({ children }: { children: ReactNode }) => (
  <div className="flex h-72 w-24 items-center justify-center px-4">
    {children}
  </div>
);

const withStoryExtraProps = (
  args: SingleSliderArgs,
  extraProps: SliderStoryExtraProps
): SingleSliderArgs =>
  ({
    ...(args as Record<string, unknown>),
    ...extraProps,
  }) as SingleSliderArgs;

const ControlledSingleSlider = ({ args }: { args: SingleSliderArgs }) => {
  const {
    onChange,
    onChangeEnd,
    value: valueFromArgs = defaultSingleValue,
    ...rest
  } = args;
  const [value, setValue] = useState<number>(valueFromArgs);

  useEffect(() => {
    setValue(valueFromArgs);
  }, [valueFromArgs]);

  const handleChange = useCallback(
    (nextValue: number) => {
      setValue(nextValue);
      onChange?.(nextValue);
    },
    [onChange]
  );

  const handleChangeEnd = useCallback(
    (nextValue: number) => {
      onChangeEnd?.(nextValue);
    },
    [onChangeEnd]
  );

  return (
    <Slider
      {...rest}
      onChange={handleChange}
      onChangeEnd={handleChangeEnd}
      value={value}
    />
  );
};

export const singleBaseMeta = {
  component: Slider,
  tags: ["autodocs"],
  title: "Components/Slider/Single",
} satisfies Meta<typeof Slider>;

type SingleStory = StoryObj<typeof singleBaseMeta>;

export const Default: SingleStory = {
  args: {
    label: (value) => `${value}%`,
    onChange: noopSingleOnChange,
    onChangeEnd: noopSingleOnChangeEnd,
    step: 1,
    value: 72,
  },
  render: (args) => (
    <SliderContainer>
      <ControlledSingleSlider args={args} />
    </SliderContainer>
  ),
};

export const SingleMarks: SingleStory = {
  args: {
    marks: singleMarks,
    onChange: noopSingleOnChange,
    onChangeEnd: noopSingleOnChangeEnd,
    step: 5,
    value: 45,
  },
  render: (args) => (
    <SliderContainer>
      <ControlledSingleSlider args={args} />
    </SliderContainer>
  ),
};

export const SingleTooltipModes: SingleStory = {
  args: {
    label: (value) => `${value}%`,
    onChange: noopSingleOnChange,
    onChangeEnd: noopSingleOnChangeEnd,
    value: 60,
  },
  render: (args) => (
    <div className="flex w-80 flex-col gap-4 px-4">
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">Tooltip on hover</p>
        <ControlledSingleSlider
          args={{ ...args, labelAlwaysOn: false, showLabelOnHover: true }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">Tooltip always visible</p>
        <ControlledSingleSlider
          args={{ ...args, labelAlwaysOn: true, showLabelOnHover: false }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">Tooltip hidden</p>
        <ControlledSingleSlider
          args={{
            ...args,
            label: null,
            labelAlwaysOn: false,
            showLabelOnHover: false,
          }}
        />
      </div>
    </div>
  ),
};

export const SingleRestrictToMarks: SingleStory = {
  args: {
    marks: restrictToMarksSingleMarks,
    onChange: noopSingleOnChange,
    onChangeEnd: noopSingleOnChangeEnd,
    restrictToMarks: true,
    value: 55,
  },
  render: (args) => (
    <SliderContainer>
      <ControlledSingleSlider args={args} />
    </SliderContainer>
  ),
};

export const SingleScaleDomain: SingleStory = {
  args: {
    domain: [-1000, 11_000],
    label: scaleLabel,
    marks: [
      { label: "0k", value: 0 },
      { label: "5k", value: 5000 },
      { label: "10k", value: 10_000 },
    ],
    max: 10_000,
    min: 0,
    onChange: noopSingleOnChange,
    onChangeEnd: noopSingleOnChangeEnd,
    scale: (value) => value / 1000,
    step: 250,
    value: 4500,
  },
  render: (args) => (
    <SliderContainer>
      <ControlledSingleSlider args={args} />
    </SliderContainer>
  ),
};

export const SingleLabelTransitionProps: SingleStory = {
  args: {
    label: (value) => `${value}%`,
    labelAlwaysOn: false,
    onChange: noopSingleOnChange,
    onChangeEnd: noopSingleOnChangeEnd,
    showLabelOnHover: true,
    value: 35,
  },
  render: (args) => (
    <div className="flex w-80 flex-col gap-4 px-4">
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          Default thumb label transition
        </p>
        <ControlledSingleSlider args={args} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          Custom transition via labelTransitionProps
        </p>
        <ControlledSingleSlider
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

const SingleHiddenInputPropsDemo = () => {
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
      <ControlledSingleSlider
        args={withStoryExtraProps(
          {
            "aria-label": "Volume",
            label: (value) => `${value}%`,
            labelAlwaysOn: true,
            name: "volume",
            onChange: noopSingleOnChange,
            onChangeEnd: noopSingleOnChangeEnd,
            value: 62,
          },
          {
            hiddenInputProps: {
              id: "slider-single-hidden-input",
            },
          }
        )}
      />
      <button
        className="border-border bg-background text-foreground hover:bg-muted inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs transition-colors"
        type="submit"
      >
        Read form data
      </button>
      <pre className="border-border bg-muted text-muted-foreground rounded-md border p-2 text-xs">
        {submittedEntries?.length
          ? submittedEntries.join("\n")
          : singleInputPreviewHelpText}
      </pre>
    </form>
  );
};

export const SingleNameAndHiddenInputProps: SingleStory = {
  render: () => <SingleHiddenInputPropsDemo />,
};

export const SingleColorSizeRadius: SingleStory = {
  args: {
    label: (value) => `${value}%`,
    onChange: noopSingleOnChange,
    onChangeEnd: noopSingleOnChangeEnd,
    value: 55,
  },
  render: (args) => (
    <div className="flex w-80 flex-col gap-4 px-4">
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">Default tokens</p>
        <ControlledSingleSlider args={args} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          color/size/radius overrides
        </p>
        <ControlledSingleSlider
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

export const SingleEndpointAlignment: SingleStory = {
  args: {
    marks: [
      { label: "min", value: 0 },
      { label: "max", value: 100 },
    ],
    onChange: noopSingleOnChange,
    onChangeEnd: noopSingleOnChangeEnd,
    step: 1,
    value: 0,
  },
  render: (args) => (
    <div className="flex w-80 flex-col gap-4 px-4">
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          Minimum endpoint alignment
        </p>
        <ControlledSingleSlider args={{ ...args, value: 0 }} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-muted-foreground text-sm">
          Maximum endpoint alignment
        </p>
        <ControlledSingleSlider args={{ ...args, value: 100 }} />
      </div>
    </div>
  ),
};

export const VerticalSingle: SingleStory = {
  args: {
    labelAlwaysOn: true,
    onChange: noopSingleOnChange,
    onChangeEnd: noopSingleOnChangeEnd,
    orientation: "vertical",
    value: 40,
  },
  render: (args) => (
    <VerticalSliderContainer>
      <ControlledSingleSlider args={args} />
    </VerticalSliderContainer>
  ),
};

export const VerticalSingleMarks: SingleStory = {
  args: {
    label: (value) => `${value}%`,
    marks: singleMarks,
    onChange: noopSingleOnChange,
    onChangeEnd: noopSingleOnChangeEnd,
    orientation: "vertical",
    value: 45,
  },
  render: (args) => (
    <VerticalSliderContainer>
      <ControlledSingleSlider args={args} />
    </VerticalSliderContainer>
  ),
};

export const VerticalSingleRestrictToMarks: SingleStory = {
  args: {
    marks: restrictToMarksSingleMarks,
    onChange: noopSingleOnChange,
    onChangeEnd: noopSingleOnChangeEnd,
    orientation: "vertical",
    restrictToMarks: true,
    value: 55,
  },
  render: (args) => (
    <VerticalSliderContainer>
      <ControlledSingleSlider args={args} />
    </VerticalSliderContainer>
  ),
};
