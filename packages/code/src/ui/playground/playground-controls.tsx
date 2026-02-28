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
  <Card data-slot="playground-controls">
    <Card.Content>
      {controls.map((control) => {
        const { prop } = control;
        const locked = lockedProps?.has(prop) ?? false;

        return (
          <PlaygroundControlField
            control={control}
            key={control.prop}
            locked={locked}
            onChange={(nextValue) => {
              onChange(prop, nextValue);
            }}
            value={state[prop as keyof PlaygroundStateFromControls<TControls>]}
          />
        );
      })}
    </Card.Content>
  </Card>
);
