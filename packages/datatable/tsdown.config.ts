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
    "hooks/use-datatable-state":
      "src/hooks/use-datatable-state/use-datatable-state.ts",
    "ui/mock-data-table": "src/ui/mock-data-table/mock-data-table.tsx",
    "utils/create-mock-columns":
      "src/utils/create-mock-columns/create-mock-columns.ts",
  },
  exports: {
    devExports: true,
    packageJson: true,
  },
  format: ["esm"],
  platform: "neutral",
  publint: true,
  sourcemap: true,
});
