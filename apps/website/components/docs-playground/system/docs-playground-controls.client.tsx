"use client";

import { Button, ButtonGroup, Input, Switch, Typography } from "@kuzenbo/core";
import { type ChangeEvent, type MouseEvent, useCallback } from "react";
import { tv } from "tailwind-variants";

import type {
  DocsPlaygroundControl,
  DocsPlaygroundControlsProps,
  PlaygroundState,
} from "./types";

const docsPlaygroundControlDescriptionVariants = tv({
  base: "text-xs",
});

const docsPlaygroundOptionGroupVariants = tv({
  base: "flex w-full flex-wrap gap-2",
});

const docsPlaygroundBooleanControlVariants = tv({
  base: "flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2",
});

const docsPlaygroundControlsVariants = tv({
  base: "space-y-5",
});

const docsPlaygroundControlRowVariants = tv({
  base: "space-y-2",
});

const docsPlaygroundControlLabelRowVariants = tv({
  base: "flex items-center justify-between gap-2",
});

const toControlId = (playgroundId: string, key: string): string =>
  `${playgroundId}-${key}-control`;

const ControlDescription = ({ description }: { description?: string }) => {
  if (!description) {
    return null;
  }

  return (
    <Typography.Muted className={docsPlaygroundControlDescriptionVariants()}>
      {description}
    </Typography.Muted>
  );
};

const OptionsControl = <TState extends PlaygroundState>({
  control,
  controlKey,
  controlValue,
  disabled,
  onControlChange,
}: {
  control: DocsPlaygroundControl<TState>;
  controlKey: keyof TState & string;
  controlValue: TState[keyof TState & string];
  disabled: boolean;
  onControlChange: (
    key: keyof TState & string,
    value: TState[keyof TState & string]
  ) => void;
}) => {
  const handleOptionClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (control.type !== "option") {
        return;
      }

      const optionIndex = Number(event.currentTarget.dataset.optionIndex);
      const option = control.options[optionIndex];
      if (!option) {
        return;
      }

      onControlChange(
        controlKey,
        option.value as TState[keyof TState & string]
      );
    },
    [control, controlKey, onControlChange]
  );

  if (control.type !== "option") {
    return null;
  }

  return (
    <ButtonGroup
      className={docsPlaygroundOptionGroupVariants()}
      data-slot="playground-option-control"
    >
      {control.options.map((option, optionIndex) => {
        const isActive = Object.is(option.value, controlValue);
        const label = `${control.label}: ${option.label}`;

        return (
          <Button
            aria-label={label}
            aria-pressed={isActive}
            data-option-index={optionIndex}
            disabled={disabled}
            key={`${controlKey}-${String(option.value)}`}
            onClick={handleOptionClick}
            size="sm"
            type="button"
            variant={isActive ? "default" : "outline"}
          >
            {option.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

const BooleanControl = <TState extends PlaygroundState>({
  control,
  controlId,
  controlKey,
  controlValue,
  disabled,
  onControlChange,
}: {
  control: DocsPlaygroundControl<TState>;
  controlId: string;
  controlKey: keyof TState & string;
  controlValue: TState[keyof TState & string];
  disabled: boolean;
  onControlChange: (
    key: keyof TState & string,
    value: TState[keyof TState & string]
  ) => void;
}) => {
  const handleCheckedChange = useCallback(
    (value: boolean) => {
      onControlChange(controlKey, value as TState[keyof TState & string]);
    },
    [controlKey, onControlChange]
  );

  if (control.type !== "boolean") {
    return null;
  }

  return (
    <div className={docsPlaygroundBooleanControlVariants()}>
      <Typography.Small className="">{control.label}</Typography.Small>
      <Switch
        aria-label={control.label}
        checked={Boolean(controlValue)}
        disabled={disabled}
        id={controlId}
        onCheckedChange={handleCheckedChange}
      />
    </div>
  );
};

const TextControl = <TState extends PlaygroundState>({
  control,
  controlId,
  controlKey,
  controlValue,
  disabled,
  onControlChange,
}: {
  control: DocsPlaygroundControl<TState>;
  controlId: string;
  controlKey: keyof TState & string;
  controlValue: TState[keyof TState & string];
  disabled: boolean;
  onControlChange: (
    key: keyof TState & string,
    value: TState[keyof TState & string]
  ) => void;
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onControlChange(
        controlKey,
        event.currentTarget.value as TState[keyof TState & string]
      );
    },
    [controlKey, onControlChange]
  );

  if (control.type !== "text") {
    return null;
  }

  return (
    <Input
      aria-label={control.label}
      disabled={disabled}
      id={controlId}
      maxLength={control.maxLength}
      onChange={handleChange}
      placeholder={control.placeholder}
      type="text"
      value={String(controlValue)}
    />
  );
};

const NumberControl = <TState extends PlaygroundState>({
  control,
  controlId,
  controlKey,
  controlValue,
  disabled,
  onControlChange,
}: {
  control: DocsPlaygroundControl<TState>;
  controlId: string;
  controlKey: keyof TState & string;
  controlValue: TState[keyof TState & string];
  disabled: boolean;
  onControlChange: (
    key: keyof TState & string,
    value: TState[keyof TState & string]
  ) => void;
}) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onControlChange(
        controlKey,
        Number(event.currentTarget.value) as TState[keyof TState & string]
      );
    },
    [controlKey, onControlChange]
  );

  if (control.type !== "number") {
    return null;
  }

  return (
    <Input
      aria-label={control.label}
      disabled={disabled}
      id={controlId}
      max={control.max}
      min={control.min}
      onChange={handleChange}
      step={control.step}
      type="number"
      value={Number(controlValue)}
    />
  );
};

export const DocsPlaygroundControls = <TState extends PlaygroundState>({
  controls,
  fixedKeys,
  onControlChange,
  playgroundId,
  state,
}: DocsPlaygroundControlsProps<TState>) => (
  <div
    className={docsPlaygroundControlsVariants()}
    data-slot="docs-playground-controls"
  >
    {controls.map((control) => {
      const controlKey = control.key as keyof TState & string;
      const controlValue = state[controlKey];
      const controlId = toControlId(playgroundId, controlKey);
      const isFixed = fixedKeys.has(controlKey);

      return (
        <div className={docsPlaygroundControlRowVariants()} key={controlKey}>
          {control.type === "boolean" ? null : (
            <div className={docsPlaygroundControlLabelRowVariants()}>
              <Typography.Small className="">{control.label}</Typography.Small>
              {isFixed ? (
                <Typography.Small className="text-muted-foreground">
                  Preset locked
                </Typography.Small>
              ) : null}
            </div>
          )}

          <OptionsControl
            control={control}
            controlKey={controlKey}
            controlValue={controlValue}
            disabled={isFixed}
            onControlChange={onControlChange}
          />

          <TextControl
            control={control}
            controlId={controlId}
            controlKey={controlKey}
            controlValue={controlValue}
            disabled={isFixed}
            onControlChange={onControlChange}
          />

          <NumberControl
            control={control}
            controlId={controlId}
            controlKey={controlKey}
            controlValue={controlValue}
            disabled={isFixed}
            onControlChange={onControlChange}
          />

          <BooleanControl
            control={control}
            controlId={controlId}
            controlKey={controlKey}
            controlValue={controlValue}
            disabled={isFixed}
            onControlChange={onControlChange}
          />

          <ControlDescription description={control.description} />
        </div>
      );
    })}
  </div>
);
