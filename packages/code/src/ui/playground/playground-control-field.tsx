import type { ChangeEvent } from "react";

import {
  Button,
  ButtonGroup,
  Input,
  Select,
  Slider,
  Switch,
  Typography,
} from "@kuzenbo/core";

import type {
  PlaygroundControl,
  PlaygroundSelectableOption,
} from "../../playground/playground-control-model";

import { getPlaygroundControlLabel } from "../../utils/playground/get-playground-control-label";
import { normalizePlaygroundOptions } from "../../utils/playground/normalize-playground-options";

export interface PlaygroundControlFieldProps {
  control: PlaygroundControl;
  value: unknown;
  locked?: boolean;
  onChange: (value: unknown) => void;
}

const DEFAULT_SIZE_VALUES = ["xs", "sm", "md", "lg", "xl"] as const;

const parseNumberFromInput = (
  event: ChangeEvent<HTMLInputElement>,
  fallback: number
): number => {
  const nextValue = Number.parseFloat(event.currentTarget.value);
  return Number.isFinite(nextValue) ? nextValue : fallback;
};

const normalizeOptions = (
  options: readonly PlaygroundSelectableOption<string>[],
  transformLabels: boolean
) => normalizePlaygroundOptions(options, transformLabels);

const getControlLabel = (control: PlaygroundControl): string =>
  control.label ?? getPlaygroundControlLabel(control.prop);

export const PlaygroundControlField = ({
  control,
  value,
  onChange,
  locked = false,
}: PlaygroundControlFieldProps) => {
  const controlLabel = getControlLabel(control);

  if (control.type === "boolean") {
    return (
      <label className="flex items-center justify-between gap-3 text-sm text-foreground">
        <Typography.Small>{controlLabel}</Typography.Small>
        <Switch
          aria-label={controlLabel}
          checked={Boolean(value)}
          disabled={locked}
          onCheckedChange={(checked) => {
            onChange(checked);
          }}
        />
      </label>
    );
  }

  if (control.type === "select") {
    const options = normalizeOptions(control.options, true);

    return (
      <div className="space-y-2">
        <Typography.Small>{controlLabel}</Typography.Small>
        <Select<string>
          disabled={locked}
          onValueChange={(nextValue) => {
            onChange(nextValue);
          }}
          value={String(value)}
        >
          <Select.Trigger aria-label={controlLabel} className="min-w-40">
            <Select.Value placeholder={controlLabel} />
          </Select.Trigger>
          <Select.Content>
            {options.map((option) => (
              <Select.Item key={option.value} value={option.value}>
                {option.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </div>
    );
  }

  if (control.type === "segmented") {
    const options = normalizeOptions(
      control.options,
      control.transformLabels ?? true
    );

    return (
      <fieldset className="space-y-2" disabled={locked}>
        <Typography.Small render={(props) => <legend {...props} />}>
          {controlLabel}
        </Typography.Small>
        <ButtonGroup role="radiogroup" aria-label={controlLabel}>
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <Button
                aria-checked={selected}
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                }}
                role="radio"
                size="xs"
                type="button"
                variant={selected ? "default" : "outline"}
              >
                {option.label}
              </Button>
            );
          })}
        </ButtonGroup>
      </fieldset>
    );
  }

  if (control.type === "number") {
    return (
      <label className="flex flex-col gap-2 text-sm text-foreground">
        <Typography.Small>{controlLabel}</Typography.Small>
        <Input
          aria-label={controlLabel}
          disabled={locked}
          max={control.max}
          min={control.min}
          onChange={(event) => {
            onChange(parseNumberFromInput(event, Number(value)));
          }}
          step={control.step}
          type="number"
          value={Number(value)}
        />
      </label>
    );
  }

  if (control.type === "string") {
    return (
      <label className="flex flex-col gap-2 text-sm text-foreground">
        <Typography.Small>{controlLabel}</Typography.Small>
        <Input
          aria-label={controlLabel}
          disabled={locked}
          onChange={(event) => {
            onChange(event.currentTarget.value);
          }}
          type="text"
          value={String(value)}
        />
      </label>
    );
  }

  if (control.type === "color") {
    const colorValue = String(value);
    const swatches = control.swatches ?? [];

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3 text-sm text-foreground">
          <Typography.Small>{controlLabel}</Typography.Small>
          <Input
            aria-label={`${controlLabel} picker`}
            className="h-8 w-12 rounded border border-border bg-background p-0"
            disabled={locked}
            onChange={(event) => {
              onChange(event.currentTarget.value);
            }}
            type="color"
            value={/^#[\da-fA-F]{6}$/.test(colorValue) ? colorValue : "#000000"}
          />
        </div>
        <Input
          aria-label={controlLabel}
          disabled={locked}
          onChange={(event) => {
            onChange(event.currentTarget.value);
          }}
          type="text"
          value={colorValue}
        />
        {swatches.length > 0 ? (
          <ButtonGroup>
            {swatches.map((swatchColor) => (
              <Button
                aria-label={`${controlLabel} ${swatchColor}`}
                className="h-6 w-6 rounded border border-border p-0"
                disabled={locked}
                key={swatchColor}
                onClick={() => {
                  onChange(swatchColor);
                }}
                size="icon-xs"
                style={{ backgroundColor: swatchColor }}
                type="button"
                variant="outline"
              />
            ))}
          </ButtonGroup>
        ) : null}
      </div>
    );
  }

  const sizes = control.values?.length ? control.values : DEFAULT_SIZE_VALUES;
  const fallbackSize = sizes[0] ?? DEFAULT_SIZE_VALUES[0];
  const resolvedValue = String(value);
  const selectedIndex = Math.max(0, sizes.indexOf(resolvedValue));

  return (
    <label className="flex flex-col gap-2 text-sm text-foreground">
      <Typography.Small>{controlLabel}</Typography.Small>
      <Slider
        aria-label={controlLabel}
        disabled={locked}
        min={0}
        max={Math.max(sizes.length - 1, 0)}
        label={null}
        onChange={(nextIndex) => {
          const resolvedIndex = Math.round(nextIndex);
          const nextValue = sizes[resolvedIndex] ?? fallbackSize;
          onChange(nextValue);
        }}
        step={1}
        value={selectedIndex}
      />
      <Typography.Muted className="text-xs">
        {sizes[selectedIndex] ?? fallbackSize}
      </Typography.Muted>
    </label>
  );
};
