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
    index: "src/index.ts",
  },
  exports: {
    devExports: true,
    packageJson: true,
  },
  format: ["esm"],
  platform: "node",
  publint: true,
  sourcemap: true,
});
