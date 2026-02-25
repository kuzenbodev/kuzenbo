import { expect, test } from "bun:test";

import {
  buttonPlaygroundInitialState,
  serializeButtonPlaygroundCode,
} from "./button-playground.definition";

test("minimal mode omits default props", () => {
  const code = serializeButtonPlaygroundCode({
    fixedState: {},
    initialState: buttonPlaygroundInitialState,
    mode: "minimal",
    state: buttonPlaygroundInitialState,
  });

  expect(code).toContain("return <Button>Button</Button>;");
  expect(code).not.toContain("variant=");
  expect(code).not.toContain("size=");
  expect(code).not.toContain("disabled=");
  expect(code).not.toContain("isLoading=");
});

test("full mode includes all controllable props", () => {
  const code = serializeButtonPlaygroundCode({
    fixedState: {},
    initialState: buttonPlaygroundInitialState,
    mode: "full",
    state: buttonPlaygroundInitialState,
  });

  expect(code).toContain("const fullWidth = false;");
  expect(code).toContain('variant="default"');
  expect(code).toContain('size="md"');
  expect(code).toContain("disabled={false}");
  expect(code).toContain("isLoading={false}");
});

test("minimal mode includes width wrapper when fullWidth is enabled", () => {
  const code = serializeButtonPlaygroundCode({
    fixedState: {},
    initialState: buttonPlaygroundInitialState,
    mode: "minimal",
    state: {
      ...buttonPlaygroundInitialState,
      fullWidth: true,
    },
  });

  expect(code).toContain('className="w-full max-w-sm"');
  expect(code).toContain('className="w-full"');
});

test("serializer escapes label strings deterministically", () => {
  const code = serializeButtonPlaygroundCode({
    fixedState: {},
    initialState: buttonPlaygroundInitialState,
    mode: "minimal",
    state: {
      ...buttonPlaygroundInitialState,
      label: 'Save "now"',
    },
  });

  expect(code).toContain('{"Save \\"now\\""}');
});
