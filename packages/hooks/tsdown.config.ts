import type { TsdownInputOption } from "tsdown";

import { defineConfig } from "tsdown";

const entries: TsdownInputOption = {
  index: "src/index.ts",
  "use-fullscreen": "src/use-fullscreen/use-fullscreen.ts",
  "use-mobile": "src/use-mobile/use-mobile.ts",
  "use-isomorphic-effect": "src/use-isomorphic-effect/use-isomorphic-effect.ts",
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
});
