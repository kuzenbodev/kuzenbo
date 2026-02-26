import type { TsdownInputOption } from "tsdown";

import { defineConfig } from "tsdown";

const entries: TsdownInputOption = {
  "ui/toast": "src/ui/toast/toast.tsx",
};

export default defineConfig({
  entry: entries,
  format: ["esm"],
  dts: {
    sourcemap: true,
  },
  sourcemap: true,
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
    customExports(currentExports) {
      const rootExport = currentExports["."];
      if (!rootExport) {
        return currentExports;
      }

      const exportsWithoutRoot = { ...currentExports };
      delete exportsWithoutRoot["."];
      return {
        ...exportsWithoutRoot,
        "./ui/toast": rootExport,
      };
    },
  },
});
