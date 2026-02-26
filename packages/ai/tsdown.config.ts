import type { TsdownInputOption } from "tsdown";

import { defineConfig } from "tsdown";

const entries: TsdownInputOption = {
  "hooks/use-ai-session": "src/hooks/use-ai-session/use-ai-session.ts",
  "ui/ai-widget": "src/ui/ai-widget/ai-widget.tsx",
  "utils/build-ai-prompt": "src/utils/build-ai-prompt/build-ai-prompt.ts",
};

export default defineConfig({
  entry: entries,
  format: ["esm"],
  dts: {
    sourcemap: true,
  },
  sourcemap: true,
  clean: true,
  platform: "neutral",
  publint: true,
  attw: {
    profile: "esm-only",
    ignoreRules: ["no-resolution"],
  },
  exports: {
    devExports: true,
    packageJson: true,
  },
});
