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
    "ui/toast": "src/ui/toast/toast.tsx",
  },
  exports: {
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
    devExports: true,
    packageJson: true,
  },
  format: ["esm"],
  platform: "neutral",
  publint: true,
  sourcemap: true,
});
