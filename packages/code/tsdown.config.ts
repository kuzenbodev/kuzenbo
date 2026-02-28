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
    "playground/inject-playground-preview-props":
      "src/playground/inject-playground-preview-props.ts",
    "playground/playground-control-model":
      "src/playground/playground-control-model.ts",
    "playground/playground-preset-model":
      "src/playground/playground-preset-model.ts",
    "playground/playground-state-model":
      "src/playground/playground-state-model.ts",
    "playground/use-playground-state": "src/playground/use-playground-state.ts",
    "shiki/highlight-code": "src/shiki/highlight-code.ts",
    "shiki/shiki-highlighter": "src/shiki/shiki-highlighter.ts",
    "shiki/shiki-language-map": "src/shiki/shiki-language-map.ts",
    "shiki/shiki-transformers": "src/shiki/shiki-transformers.ts",
    "ui/code-block": "src/ui/code-block/code-block.tsx",
    "ui/code-block-toolbar": "src/ui/code-block-toolbar/code-block-toolbar.tsx",
    "ui/code-diff-block": "src/ui/code-diff-block/code-diff-block.tsx",
    "ui/code-line-highlight":
      "src/ui/code-line-highlight/code-line-highlight.tsx",
    "ui/code-preview": "src/ui/code-preview/code-preview.tsx",
    "ui/code-tabs": "src/ui/code-tabs/code-tabs.tsx",
    "ui/code-window": "src/ui/code-window/code-window.tsx",
    "ui/file-tree": "src/ui/file-tree/file-tree.tsx",
    "ui/inline-code-highlight":
      "src/ui/inline-code-highlight/inline-code-highlight.tsx",
    "ui/install-command-snippet":
      "src/ui/install-command-snippet/install-command-snippet.tsx",
    "ui/package-manager-tabs":
      "src/ui/package-manager-tabs/package-manager-tabs.tsx",
    "ui/package-manager-tabs/package-manager-tabs-types":
      "src/ui/package-manager-tabs/package-manager-tabs-types.ts",
    "ui/playground": "src/ui/playground",
    "ui/terminal-block": "src/ui/terminal-block/terminal-block.tsx",
    "utils/codegen/clear-playground-default-props":
      "src/utils/codegen/clear-playground-default-props.ts",
    "utils/codegen/generate-playground-code":
      "src/utils/codegen/generate-playground-code.ts",
    "utils/codegen/inject-playground-props":
      "src/utils/codegen/inject-playground-props.ts",
    "utils/codegen/playground-codegen-model":
      "src/utils/codegen/playground-codegen-model.ts",
    "utils/codegen/serialize-playground-prop":
      "src/utils/codegen/serialize-playground-prop.ts",
    "utils/playground/get-playground-control-label":
      "src/utils/playground/get-playground-control-label.ts",
    "utils/playground/normalize-playground-options":
      "src/utils/playground/normalize-playground-options.ts",
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
