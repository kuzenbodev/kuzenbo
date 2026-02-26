import type { TsdownInputOption } from "tsdown";

import { defineConfig } from "tsdown";

const entries: TsdownInputOption = {
  "editor/capabilities": "src/editor/capabilities.ts",
  "editor/create-tiptap-extensions-preset":
    "src/editor/create-tiptap-extensions-preset.ts",
  "editor/markdown-adapter": "src/editor/markdown-adapter.ts",
  "editor/use-kuzenbo-editor": "src/editor/use-kuzenbo-editor.ts",
  extensions: "src/extensions",
  "ui/menus/mention-menu": "src/ui/menus/mention-menu.tsx",
  "ui/menus/slash-menu": "src/ui/menus/slash-menu.tsx",
  "ui/tiptap-editor": "src/ui/tiptap-editor/tiptap-editor.tsx",
  "ui/tiptap-editor/tiptap-editor-context":
    "src/ui/tiptap-editor/tiptap-editor-context.tsx",
  "ui/tiptap-editor/tiptap-editor-labels":
    "src/ui/tiptap-editor/tiptap-editor-labels.ts",
  "ui/tiptap-editor/tiptap-editor-state":
    "src/ui/tiptap-editor/tiptap-editor-state.ts",
};

export default defineConfig({
  entry: entries,
  format: ["esm"],
  dts: {
    sourcemap: true,
  },
  sourcemap: true,
  copy: ["src/styles"],
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
    customExports(currentExports, { isPublish }) {
      return {
        ...currentExports,
        "./styles.css": isPublish
          ? "./dist/styles/tiptap-editor.css"
          : "./src/styles/tiptap-editor.css",
      };
    },
  },
});
