# @kuzenbo/charts

Ready-made chart components for Kuzenbo.

> ✅ **Status: Public**

## ✨ What This Package Solves

`@kuzenbo/charts` ships production-ready charts for trend, comparison, and distribution visualizations.

## 📦 Install

```bash
bun add @kuzenbo/charts @kuzenbo/core @kuzenbo/theme recharts
```

```bash
npm install @kuzenbo/charts @kuzenbo/core @kuzenbo/theme recharts
```

```bash
pnpm add @kuzenbo/charts @kuzenbo/core @kuzenbo/theme recharts
```

```bash
yarn add @kuzenbo/charts @kuzenbo/core @kuzenbo/theme recharts
```

## ✅ Requirements

- React 19+
- `react-dom`
- `recharts`
- `@kuzenbo/core`
- `@kuzenbo/theme`

## 🎨 Runtime Pairing

`@kuzenbo/charts` is designed to run with `@kuzenbo/core` and `@kuzenbo/theme`.

## ⚡ Quick Example

```tsx
"use client";

import { LineChart } from "@kuzenbo/charts/ui/line-chart";

const data = [
  { month: "Jan", revenue: 172000, target: 180000 },
  { month: "Feb", revenue: 186000, target: 190000 },
  { month: "Mar", revenue: 201000, target: 205000 },
];

const series = [
  { name: "revenue", label: "Revenue", color: "var(--color-chart-1)" },
  { name: "target", label: "Target", color: "var(--color-chart-4)" },
] as const;

export function ChartsQuickExample() {
  return (
    <LineChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={data}
      dataKey="month"
      series={series}
      valueFormatter={(value) => `$${value.toLocaleString()}`}
      withLegend
    />
  );
}
```

## 🧱 Key Surface

- ✅ `@kuzenbo/charts/ui/area-chart`
- ✅ `@kuzenbo/charts/ui/bar-chart`
- ✅ `@kuzenbo/charts/ui/bubble-chart`
- ✅ `@kuzenbo/charts/ui/composite-chart`
- ✅ `@kuzenbo/charts/ui/donut-chart`
- ✅ `@kuzenbo/charts/ui/funnel-chart`
- ✅ `@kuzenbo/charts/ui/heatmap`
- ✅ `@kuzenbo/charts/ui/line-chart`
- ✅ `@kuzenbo/charts/ui/pie-chart`
- ✅ `@kuzenbo/charts/ui/radar-chart`
- ✅ `@kuzenbo/charts/ui/radial-bar-chart`
- ✅ `@kuzenbo/charts/ui/scatter-chart`
- ✅ `@kuzenbo/charts/ui/sparkline`

## 📚 Docs And Playgrounds

- [Charts Foundation](https://kuzenbo.com/docs/foundations/charts)
- [Line Chart](https://kuzenbo.com/docs/components/line-chart)
- [Bar Chart](https://kuzenbo.com/docs/components/bar-chart)

## 🧭 Compatibility And Status

`@kuzenbo/charts` is public and actively documented for production usage.
