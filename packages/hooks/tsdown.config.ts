import type { TsdownInputOption } from "tsdown";

import { defineConfig } from "tsdown";

const entries: TsdownInputOption = {
  "use-clipboard": "src/use-clipboard/use-clipboard.ts",
  "use-fullscreen": "src/use-fullscreen/use-fullscreen.ts",
  "use-isomorphic-effect": "src/use-isomorphic-effect/use-isomorphic-effect.ts",
  "use-mobile": "src/use-mobile/use-mobile.ts",
};

export default defineConfig({
  entry: entries,
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
