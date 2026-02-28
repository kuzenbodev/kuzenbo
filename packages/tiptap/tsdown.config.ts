import { defineConfig } from "tsdown";

export default defineConfig({
  attw: {
    ignoreRules: ["no-resolution"],
    profile: "esm-only",
  },
  clean: true,
  copy: ["src/styles"],
  dts: {
    sourcemap: true,
  },
  entry: {
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
  },
  exports: {
    customExports(currentExports, { isPublish }) {
      return {
        ...currentExports,
        "./styles.css": isPublish
          ? "./dist/styles/tiptap-editor.css"
          : "./src/styles/tiptap-editor.css",
      };
    },
    devExports: true,
    packageJson: true,
  },
  format: ["esm"],
  platform: "neutral",
  publint: true,
  sourcemap: true,
});
