import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    "hooks/use-ai-session": "src/hooks/use-ai-session/use-ai-session.ts",
    "ui/ai-widget": "src/ui/ai-widget/ai-widget.tsx",
    "utils/build-ai-prompt": "src/utils/build-ai-prompt/build-ai-prompt.ts",
  },
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
