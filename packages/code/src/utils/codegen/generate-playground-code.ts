import type {
  PlaygroundControl,
  PlaygroundStateFromControls,
} from "../../playground/playground-control-model";
import type {
  GeneratePlaygroundCodeOptions,
  PlaygroundGeneratedCodeFile,
} from "./playground-codegen-model";

import { clearPlaygroundDefaultProps } from "./clear-playground-default-props";
import { injectPlaygroundProps } from "./inject-playground-props";

const DEFAULT_FILE_NAME = "Demo.tsx";
const DEFAULT_LANGUAGE = "tsx";

const getDefaultFileName = (index: number): string =>
  index === 0 ? DEFAULT_FILE_NAME : `Demo-${index + 1}.tsx`;

const generateCodeForTemplate = <
  TControls extends readonly PlaygroundControl[],
>(
  controls: TControls,
  state: PlaygroundStateFromControls<TControls>,
  template: string,
  mode: "minimal" | "full"
): string => {
  const changedProps = clearPlaygroundDefaultProps({
    controls,
    state,
    mode,
  });
  const stateRecord = state as Record<string, unknown>;
  const props = changedProps as Record<string, unknown>;

  if (Object.hasOwn(stateRecord, "children")) {
    props.children = stateRecord.children;
  }

  return injectPlaygroundProps({
    template,
    props,
    propOrder: controls.map((control) => control.prop),
  });
};

export const generatePlaygroundCode = <
  TControls extends readonly PlaygroundControl[],
>({
  controls,
  state,
  template,
  mode = "minimal",
}: GeneratePlaygroundCodeOptions<TControls>): PlaygroundGeneratedCodeFile[] => {
  if (typeof template === "string") {
    return [
      {
        fileName: DEFAULT_FILE_NAME,
        language: DEFAULT_LANGUAGE,
        code: generateCodeForTemplate(controls, state, template, mode),
      },
    ];
  }

  return template.map((templateFile, index) => ({
    fileName: templateFile.fileName ?? getDefaultFileName(index),
    language: templateFile.language ?? DEFAULT_LANGUAGE,
    code: generateCodeForTemplate(controls, state, templateFile.code, mode),
  }));
};
