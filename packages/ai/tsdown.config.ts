import { defineConfig } from "tsdown";

export default defineConfig({
  attw: {
    ignoreRules: ["no-resolution"],
    profile: "esm-only",
  },
  clean: true,
  dts: {
    sourcemap: true,
  },
  entry: {
    "hooks/use-ai-session": "src/hooks/use-ai-session/use-ai-session.ts",
    "ui/ai-widget": "src/ui/ai-widget/ai-widget.tsx",
    "utils/build-ai-prompt": "src/utils/build-ai-prompt/build-ai-prompt.ts",
  },
  exports: {
    devExports: true,
    packageJson: true,
  },
  format: ["esm"],
  platform: "neutral",
  publint: true,
  sourcemap: true,
});
