import type { TsdownInputOption } from "tsdown";

import { defineConfig } from "tsdown";

const entries: TsdownInputOption = {
  index: "src/index.ts",
};

export default defineConfig({
  entry: entries,
  format: ["esm"],
  dts: {
    sourcemap: true,
  },
  sourcemap: true,
  copy: ["src/default.css", "src/prebuilt"],
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
        "./default.css": isPublish ? "./dist/default.css" : "./src/default.css",
        "./prebuilt/*.css": isPublish
          ? "./dist/prebuilt/*.css"
          : "./src/prebuilt/*.css",
      };
    },
  },
});
