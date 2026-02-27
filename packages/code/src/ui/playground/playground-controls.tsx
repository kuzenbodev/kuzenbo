"use client";

import { Card } from "@kuzenbo/core/ui/card";

import type {
  PlaygroundControl,
  PlaygroundPropKeyFromControls,
  PlaygroundStateFromControls,
} from "../../playground/playground-control-model";

import { PlaygroundControlField } from "./playground-control-field";

export interface PlaygroundControlsProps<
  TControls extends readonly PlaygroundControl[],
> {
  controls: TControls;
  state: PlaygroundStateFromControls<TControls>;
  lockedProps?: ReadonlySet<PlaygroundPropKeyFromControls<TControls>>;
  onChange: (
    prop: PlaygroundPropKeyFromControls<TControls>,
    value: unknown
  ) => void;
}

export const PlaygroundControls = <
  TControls extends readonly PlaygroundControl[],
>({
  controls,
  state,
  lockedProps,
  onChange,
}: PlaygroundControlsProps<TControls>) => (
  <Card className="gap-3 py-3" data-slot="playground-controls">
    <Card.Content className="space-y-4">
      {controls.map((control) => {
        const prop = control.prop as PlaygroundPropKeyFromControls<TControls>;
        const locked = lockedProps?.has(prop) ?? false;

        return (
          <PlaygroundControlField
            control={control}
            key={control.prop}
            locked={locked}
            onChange={(nextValue) => {
              onChange(prop, nextValue);
            }}
            value={state[prop]}
          />
        );
      })}
    </Card.Content>
  </Card>
);
