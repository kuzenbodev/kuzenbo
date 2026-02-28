# Chart Starter Pattern (Stable 0.0.6)

Use this minimal pattern for most chart implementations.

```tsx
"use client";

import { LineChart } from "@kuzenbo/charts/ui/line-chart";

const data = [
  { label: "Jan", value: 120 },
  { label: "Feb", value: 180 },
];

const series = [
  {
    name: "value",
    label: "Value",
    color: "var(--color-chart-1)",
  },
] as const;

export function ExampleChart() {
  return (
    <LineChart
      chartRootProps={{ className: "h-80 w-full" }}
      data={data}
      dataKey="label"
      series={series}
      valueFormatter={(value) => value.toLocaleString()}
      withLegend
      withTooltip
    />
  );
}
```

## Notes

- Keep `series.name` aligned with keys in each `data` row.
- Prefer semantic chart tokens (`var(--color-chart-1..5)`) for palette consistency.
- Enable optional chart features explicitly (`withLegend`, `withTooltip`, axis toggles).
