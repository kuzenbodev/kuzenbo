import type {
  DocsPlaygroundCodegenInput,
  DocsPlaygroundDefinition,
} from "@/components/docs-playground/system/types";

import {
  formatJsxElement,
  serializeJsxProps,
  serializeJsxTextChild,
} from "@/components/docs-playground/system/codegen";

export type ButtonPlaygroundVariant =
  | "default"
  | "outline"
  | "secondary"
  | "ghost"
  | "danger"
  | "link";

export type ButtonPlaygroundSize = "sm" | "md" | "lg";

export interface ButtonPlaygroundState {
  disabled: boolean;
  fullWidth: boolean;
  isLoading: boolean;
  label: string;
  size: ButtonPlaygroundSize;
  variant: ButtonPlaygroundVariant;
}

export const buttonPlaygroundInitialState: ButtonPlaygroundState = {
  disabled: false,
  fullWidth: false,
  isLoading: false,
  label: "Button",
  size: "md",
  variant: "default",
};

const serializeButtonProps = ({
  initialState,
  mode,
  state,
}: Pick<
  DocsPlaygroundCodegenInput<ButtonPlaygroundState>,
  "initialState" | "mode" | "state"
>): string[] =>
  serializeJsxProps({
    mode,
    props: [
      {
        defaultValue: initialState.variant,
        kind: "string",
        name: "variant",
        value: state.variant,
      },
      {
        defaultValue: initialState.size,
        kind: "string",
        name: "size",
        value: state.size,
      },
      {
        defaultValue: initialState.disabled,
        kind: "boolean",
        name: "disabled",
        value: state.disabled,
      },
      {
        defaultValue: initialState.isLoading,
        kind: "boolean",
        name: "isLoading",
        value: state.isLoading,
      },
    ],
  });

export const serializeButtonPlaygroundCode = ({
  initialState,
  mode,
  state,
}: DocsPlaygroundCodegenInput<ButtonPlaygroundState>): string => {
  const buttonChildren = serializeJsxTextChild(state.label);

  if (mode === "full") {
    const fullProps = [
      'className={fullWidth ? "w-full" : undefined}',
      ...serializeButtonProps({
        initialState,
        mode,
        state,
      }),
    ];

    const fullButton = formatJsxElement("Button", fullProps, buttonChildren);

    return [
      'import { Button } from "@kuzenbo/core";',
      "",
      "export function Demo() {",
      `  const fullWidth = ${state.fullWidth};`,
      "",
      "  return (",
      '    <div className={fullWidth ? "w-full max-w-sm" : undefined}>',
      `      ${fullButton}`,
      "    </div>",
      "  );",
      "}",
    ].join("\n");
  }

  const minimalProps = serializeButtonProps({
    initialState,
    mode,
    state,
  });

  if (state.fullWidth) {
    const withWidthButton = formatJsxElement(
      "Button",
      ['className="w-full"', ...minimalProps],
      buttonChildren
    );

    return [
      'import { Button } from "@kuzenbo/core";',
      "",
      "export function Demo() {",
      "  return (",
      '    <div className="w-full max-w-sm">',
      `      ${withWidthButton}`,
      "    </div>",
      "  );",
      "}",
    ].join("\n");
  }

  const button = formatJsxElement("Button", minimalProps, buttonChildren);

  return [
    'import { Button } from "@kuzenbo/core";',
    "",
    "export function Demo() {",
    `  return ${button};`,
    "}",
  ].join("\n");
};

export const buttonPlaygroundDefinition: DocsPlaygroundDefinition<ButtonPlaygroundState> =
  {
    code: {
      filename: "Demo.tsx",
      language: "tsx",
      serialize: serializeButtonPlaygroundCode,
    },
    controls: [
      {
        key: "variant",
        label: "Variant",
        options: [
          { label: "Default", value: "default" },
          { label: "Outline", value: "outline" },
          { label: "Secondary", value: "secondary" },
          { label: "Ghost", value: "ghost" },
          { label: "Danger", value: "danger" },
          { label: "Link", value: "link" },
        ],
        type: "option",
      },
      {
        key: "size",
        label: "Size",
        options: [
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
        ],
        type: "option",
      },
      {
        key: "label",
        label: "Label",
        maxLength: 60,
        placeholder: "Button label",
        type: "text",
      },
      {
        key: "disabled",
        label: "Disabled",
        type: "boolean",
      },
      {
        key: "isLoading",
        label: "Loading",
        type: "boolean",
      },
      {
        key: "fullWidth",
        label: "Full width",
        type: "boolean",
      },
    ],
    description:
      "Interactive button preview with presets and live TSX generation.",
    id: "button-playground",
    initialState: buttonPlaygroundInitialState,
    presets: [
      {
        id: "default",
        label: "Default",
      },
      {
        fixed: {
          variant: "danger",
        },
        id: "danger",
        initial: {
          label: "Delete project",
        },
        label: "Danger",
      },
      {
        fixed: {
          isLoading: true,
        },
        id: "loading",
        initial: {
          label: "Saving changes",
        },
        label: "Loading",
      },
    ],
    title: "Button Playground",
  };
