import type { TsdownInputOption } from "tsdown";

import { defineConfig } from "tsdown";

const entries: TsdownInputOption = {
  "hooks/use-datatable-state":
    "src/hooks/use-datatable-state/use-datatable-state.ts",
  "ui/mock-data-table": "src/ui/mock-data-table/mock-data-table.tsx",
  "utils/create-mock-columns":
    "src/utils/create-mock-columns/create-mock-columns.ts",
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
  },
});
