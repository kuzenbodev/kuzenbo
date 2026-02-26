import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    "use-clipboard": "src/use-clipboard/use-clipboard.ts",
    "use-fullscreen": "src/use-fullscreen/use-fullscreen.ts",
    "use-isomorphic-effect":
      "src/use-isomorphic-effect/use-isomorphic-effect.ts",
    "use-mobile": "src/use-mobile/use-mobile.ts",
  },
  format: ["esm"],
  dts: {
    sourcemap: true,
  },
  sourcemap: true,
  clean: true,
  platform: "browser",
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
