import { generatePlaygroundCode } from "@kuzenbo/code/utils/codegen/generate-playground-code";
import { expect, test } from "bun:test";

import {
  buttonPlaygroundControls,
  buttonPlaygroundTemplate,
} from "./button-playground.definition";

const getCodeFromFirstFile = (
  mode: "minimal" | "full",
  state: {
    variant: "default" | "outline" | "secondary" | "ghost" | "danger" | "link";
    size: "sm" | "md" | "lg";
    children: string;
    disabled: boolean;
    isLoading: boolean;
  }
): string => {
  const [file] = generatePlaygroundCode({
    controls: buttonPlaygroundControls,
    mode,
    state,
    template: buttonPlaygroundTemplate,
  });

  if (!file) {
    throw new Error("Expected playground output file");
  }

  return file.code;
};

test("minimal mode omits default props", () => {
  const code = getCodeFromFirstFile("minimal", {
    variant: "default",
    size: "md",
    children: "Button",
    disabled: false,
    isLoading: false,
  });

  expect(code).toContain("<Button");
  expect(code).toContain("Button");
  expect(code).not.toContain("variant=");
  expect(code).not.toContain("size=");
  expect(code).not.toContain("disabled=");
  expect(code).not.toContain("isLoading=");
});

test("full mode includes all controllable props", () => {
  const code = getCodeFromFirstFile("full", {
    variant: "default",
    size: "md",
    children: "Button",
    disabled: false,
    isLoading: false,
  });

  expect(code).toContain('variant="default"');
  expect(code).toContain('size="md"');
  expect(code).toContain("disabled={false}");
  expect(code).toContain("isLoading={false}");
});

test("minimal mode includes variant and loading changes", () => {
  const code = getCodeFromFirstFile("minimal", {
    variant: "danger",
    size: "md",
    children: "Saving changes",
    disabled: false,
    isLoading: true,
  });

  expect(code).toContain('variant="danger"');
  expect(code).toContain("isLoading");
  expect(code).toContain("Saving changes");
});
