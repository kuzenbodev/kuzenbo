import type {
  PlaygroundControl,
  PlaygroundStateFromControls,
} from "../../playground/playground-control-model";
import { clearPlaygroundDefaultProps } from "./clear-playground-default-props";
import { injectPlaygroundProps } from "./inject-playground-props";
import type {
  GeneratePlaygroundCodeOptions,
  PlaygroundGeneratedCodeFile,
} from "./playground-codegen-model";

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
    mode,
    state,
  });
  const stateRecord = state as Record<string, unknown>;
  const props = changedProps as Record<string, unknown>;

  if (Object.hasOwn(stateRecord, "children")) {
    props.children = stateRecord.children;
  }

  return injectPlaygroundProps({
    propOrder: controls.map((control) => control.prop),
    props,
    template,
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
        code: generateCodeForTemplate(controls, state, template, mode),
        fileName: DEFAULT_FILE_NAME,
        language: DEFAULT_LANGUAGE,
      },
    ];
  }

  return template.map((templateFile, index) => ({
    code: generateCodeForTemplate(controls, state, templateFile.code, mode),
    fileName: templateFile.fileName ?? getDefaultFileName(index),
    language: templateFile.language ?? DEFAULT_LANGUAGE,
  }));
};
