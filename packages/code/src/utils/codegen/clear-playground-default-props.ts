import type {
  PlaygroundControl,
  PlaygroundStateFromControls,
} from "../../playground/playground-control-model";
import { createPlaygroundDefaultState } from "../../playground/playground-state-model";
import type { PlaygroundCodegenMode } from "./playground-codegen-model";

export interface ClearPlaygroundDefaultPropsOptions<
  TControls extends readonly PlaygroundControl[],
> {
  controls: TControls;
  state: PlaygroundStateFromControls<TControls>;
  mode?: PlaygroundCodegenMode;
}

export const clearPlaygroundDefaultProps = <
  TControls extends readonly PlaygroundControl[],
>({
  controls,
  state,
  mode = "minimal",
}: ClearPlaygroundDefaultPropsOptions<TControls>): Partial<
  PlaygroundStateFromControls<TControls>
> => {
  const stateRecord = state as Record<string, unknown>;

  if (mode === "full") {
    const nextState: Record<string, unknown> = {};

    for (const control of controls) {
      nextState[control.prop] = stateRecord[control.prop];
    }

    return nextState as Partial<PlaygroundStateFromControls<TControls>>;
  }

  const defaultState = createPlaygroundDefaultState(controls);
  const defaultStateRecord = defaultState as Record<string, unknown>;
  const changedState: Record<string, unknown> = {};

  for (const control of controls) {
    const key = control.prop;
    if (stateRecord[key] !== defaultStateRecord[key]) {
      changedState[key] = stateRecord[key];
    }
  }

  return changedState as Partial<PlaygroundStateFromControls<TControls>>;
};
