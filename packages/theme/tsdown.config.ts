import { defineConfig } from "tsdown";

export default defineConfig({
  attw: {
    ignoreRules: ["no-resolution"],
    profile: "esm-only",
  },
  clean: true,
  copy: ["src/default.css", "src/prebuilt"],
  dts: {
    sourcemap: true,
  },
  entry: {
    index: "src/index.ts",
  },
  exports: {
    customExports(currentExports, { isPublish }) {
      return {
        ...currentExports,
        "./default.css": isPublish ? "./dist/default.css" : "./src/default.css",
        "./prebuilt/*.css": isPublish
          ? "./dist/prebuilt/*.css"
          : "./src/prebuilt/*.css",
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
