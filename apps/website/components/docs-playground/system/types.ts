import type { ComponentType } from "react";

export type PlaygroundPrimitive = boolean | number | string;
export type PlaygroundState = object;

export type PlaygroundCodeMode = "minimal" | "full";

export interface DocsPlaygroundOption<Value> {
  label: string;
  value: Value;
}

interface DocsPlaygroundControlBase<
  TState extends PlaygroundState,
  TKey extends keyof TState & string,
> {
  description?: string;
  key: TKey;
  label: string;
}

export interface DocsPlaygroundOptionControl<
  TState extends PlaygroundState,
  TKey extends keyof TState & string,
> extends DocsPlaygroundControlBase<TState, TKey> {
  options: readonly DocsPlaygroundOption<TState[TKey]>[];
  type: "option";
}

export interface DocsPlaygroundBooleanControl<
  TState extends PlaygroundState,
  TKey extends keyof TState & string,
> extends DocsPlaygroundControlBase<TState, TKey> {
  type: "boolean";
}

export interface DocsPlaygroundTextControl<
  TState extends PlaygroundState,
  TKey extends keyof TState & string,
> extends DocsPlaygroundControlBase<TState, TKey> {
  maxLength?: number;
  placeholder?: string;
  type: "text";
}

export interface DocsPlaygroundNumberControl<
  TState extends PlaygroundState,
  TKey extends keyof TState & string,
> extends DocsPlaygroundControlBase<TState, TKey> {
  max?: number;
  min?: number;
  step?: number;
  type: "number";
}

export type DocsPlaygroundControl<TState extends PlaygroundState> = {
  [TKey in keyof TState & string]:
    | DocsPlaygroundOptionControl<TState, TKey>
    | DocsPlaygroundBooleanControl<TState, TKey>
    | DocsPlaygroundTextControl<TState, TKey>
    | DocsPlaygroundNumberControl<TState, TKey>;
}[keyof TState & string];

export interface DocsPlaygroundPreset<TState extends PlaygroundState> {
  description?: string;
  fixed?: Partial<TState>;
  id: string;
  initial?: Partial<TState>;
  label: string;
}

export interface DocsPlaygroundCodegenInput<TState extends PlaygroundState> {
  fixedState: Partial<TState>;
  initialState: TState;
  mode: PlaygroundCodeMode;
  state: TState;
}

export interface DocsPlaygroundDefinition<TState extends PlaygroundState> {
  code: {
    filename: string;
    language: string;
    serialize: (input: DocsPlaygroundCodegenInput<TState>) => string;
  };
  controls: readonly DocsPlaygroundControl<TState>[];
  description?: string;
  id: string;
  initialState: TState;
  presets: readonly DocsPlaygroundPreset<TState>[];
  title: string;
}

export interface DocsPlaygroundProps<TState extends PlaygroundState> {
  definition: DocsPlaygroundDefinition<TState>;
  Preview: ComponentType<TState>;
}

export interface DocsPlaygroundControlsProps<TState extends PlaygroundState> {
  controls: readonly DocsPlaygroundControl<TState>[];
  fixedKeys: ReadonlySet<keyof TState & string>;
  onControlChange: (
    key: keyof TState & string,
    value: TState[keyof TState & string]
  ) => void;
  playgroundId: string;
  state: TState;
}
