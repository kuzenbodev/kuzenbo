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
    "use-clipboard": "src/use-clipboard/use-clipboard.ts",
    "use-fullscreen": "src/use-fullscreen/use-fullscreen.ts",
    "use-isomorphic-effect":
      "src/use-isomorphic-effect/use-isomorphic-effect.ts",
    "use-mobile": "src/use-mobile/use-mobile.ts",
  },
  exports: {
    devExports: true,
    packageJson: true,
  },
  format: ["esm"],
  platform: "browser",
  publint: true,
  sourcemap: true,
});
