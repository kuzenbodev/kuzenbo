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
    "ui/area-chart": "src/ui/prebuilt/area-chart/area-chart.tsx",
    "ui/bar-chart": "src/ui/prebuilt/bar-chart/bar-chart.tsx",
    "ui/bubble-chart": "src/ui/prebuilt/bubble-chart/bubble-chart.tsx",
    "ui/composite-chart": "src/ui/prebuilt/composite-chart/composite-chart.tsx",
    "ui/donut-chart": "src/ui/prebuilt/donut-chart/donut-chart.tsx",
    "ui/funnel-chart": "src/ui/prebuilt/funnel-chart/funnel-chart.tsx",
    "ui/heatmap": "src/ui/prebuilt/heatmap/heatmap.tsx",
    "ui/line-chart": "src/ui/prebuilt/line-chart/line-chart.tsx",
    "ui/pie-chart": "src/ui/prebuilt/pie-chart/pie-chart.tsx",
    "ui/radar-chart": "src/ui/prebuilt/radar-chart/radar-chart.tsx",
    "ui/radial-bar-chart":
      "src/ui/prebuilt/radial-bar-chart/radial-bar-chart.tsx",
    "ui/scatter-chart": "src/ui/prebuilt/scatter-chart/scatter-chart.tsx",
    "ui/sparkline": "src/ui/prebuilt/sparkline/sparkline.tsx",
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
