"use client";

import { Button } from "@kuzenbo/core/ui/button";
import { ButtonGroup } from "@kuzenbo/core/ui/button-group";
import { Input } from "@kuzenbo/core/ui/input";
import { Select } from "@kuzenbo/core/ui/select";
import { Slider } from "@kuzenbo/core/ui/slider";
import { Switch } from "@kuzenbo/core/ui/switch";
import { ToggleGroup } from "@kuzenbo/core/ui/toggle-group";
import { Typography } from "@kuzenbo/core/ui/typography";
import type { ChangeEvent } from "react";

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

const toSingleGroupValue = (value: string): string[] => [value];

const fromSingleGroupValue = (values: readonly unknown[]): string | null => {
  const [firstValue] = values;
  return typeof firstValue === "string" && firstValue.length > 0
    ? firstValue
    : null;
};

export const PlaygroundControlField = ({
  control,
  value,
  onChange,
  locked = false,
}: PlaygroundControlFieldProps) => {
  const controlLabel = getControlLabel(control);

  if (control.type === "boolean") {
    return (
      <label className="text-foreground flex items-center justify-between gap-3 text-sm">
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
      <div>
        <Typography.Small className="p-0">{controlLabel}</Typography.Small>
        <Select
          disabled={locked}
          onValueChange={(nextValue) => {
            onChange(nextValue);
          }}
          value={String(value)}
        >
          <Select.Trigger
            aria-label={controlLabel}
            className="cursor-clickable min-w-40"
          >
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
    const optionValues = new Set(options.map((option) => option.value));
    const fallbackValue = options[0]?.value;
    const activeValue =
      typeof value === "string" && optionValues.has(value)
        ? value
        : fallbackValue;

    return (
      <fieldset disabled={locked}>
        <Typography.Small render={(props) => <legend {...props} />}>
          {controlLabel}
        </Typography.Small>
        <ToggleGroup
          aria-label={controlLabel}
          className="flex-wrap"
          disabled={locked}
          multiple={false}
          onValueChange={(nextValues) => {
            const nextValue = fromSingleGroupValue(nextValues);
            if (!nextValue) {
              return;
            }

            onChange(nextValue);
          }}
          size="xs"
          value={toSingleGroupValue(activeValue ?? "")}
          variant="outline"
        >
          {options.map((option) => (
            <ToggleGroup.Item
              className="cursor-clickable"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup>
      </fieldset>
    );
  }

  if (control.type === "number") {
    return (
      <label className="text-foreground flex flex-col gap-2 text-sm">
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
      <label className="text-foreground flex flex-col gap-2 text-sm">
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
      <div>
        <div className="text-foreground flex items-center justify-between gap-3 text-sm">
          <Typography.Small>{controlLabel}</Typography.Small>
          <Input
            aria-label={`${controlLabel} picker`}
            className="border-border bg-background h-8 w-12 rounded border p-0"
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
                className="cursor-clickable border-border h-6 w-6 rounded border p-0"
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
    <label className="text-foreground flex flex-col gap-2 text-sm">
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
