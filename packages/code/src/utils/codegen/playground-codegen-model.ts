import type {
  PlaygroundControl,
  PlaygroundStateFromControls,
} from "../../playground/playground-control-model";

export type PlaygroundCodegenMode = "minimal" | "full";

export interface PlaygroundCodeTemplateFile {
  fileName?: string;
  language?: string;
  code: string;
}

export type PlaygroundCodeTemplate =
  | string
  | readonly PlaygroundCodeTemplateFile[];

export interface PlaygroundGeneratedCodeFile {
  fileName: string;
  language: string;
  code: string;
}

export interface GeneratePlaygroundCodeOptions<
  TControls extends readonly PlaygroundControl[],
> {
  controls: TControls;
  state: PlaygroundStateFromControls<TControls>;
  template: PlaygroundCodeTemplate;
  mode?: PlaygroundCodegenMode;
}
