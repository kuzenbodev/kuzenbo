# @kuzenbo/datatable

Data table scaffolding components, typed helpers, and local table state hooks.

> 🧪 **Status: Preview (Not Published Yet)**

## ✨ What This Package Targets

`@kuzenbo/datatable` focuses on lightweight, typed table composition for docs, prototypes, and product tables that do not require a full enterprise datagrid layer.

## 📦 Install (When Available)

```bash
bun add @kuzenbo/datatable @kuzenbo/core @kuzenbo/theme @tanstack/react-table
```

```bash
npm install @kuzenbo/datatable @kuzenbo/core @kuzenbo/theme @tanstack/react-table
```

```bash
pnpm add @kuzenbo/datatable @kuzenbo/core @kuzenbo/theme @tanstack/react-table
```

```bash
yarn add @kuzenbo/datatable @kuzenbo/core @kuzenbo/theme @tanstack/react-table
```

## ✅ Requirements

- React 19+
- `react-dom`
- `@tanstack/react-table`
- `@kuzenbo/core`
- `@kuzenbo/theme`

## 🎨 Runtime Pairing

`@kuzenbo/datatable` is designed to run with `@kuzenbo/core` and `@kuzenbo/theme`.

## ⚡ Quick Example

```tsx
"use client";

import { MockDataTable, createMockColumns } from "@kuzenbo/datatable";

type MetricRow = {
  id: string;
  metric: string;
  value: number;
};

const data: MetricRow[] = [
  { id: "1", metric: "Revenue", value: 124000 },
  { id: "2", metric: "Sessions", value: 8942 },
];

const columns = createMockColumns<MetricRow>([
  { accessorKey: "metric", header: "Metric" },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ getValue }) => Number(getValue()).toLocaleString("en-US"),
  },
]);

export function DatatableQuickExample() {
  return <MockDataTable columns={columns} data={data} />;
}
```

## 🧱 Expected Surface

- Components: `MockDataTable`
- Hooks: `useDatatableState`
- Utilities: `createMockColumns`

## 📚 Docs And Related Routes

- [Mock Data Table](https://kuzenbo.com/docs/components/mock-data-table)
- [useDatatableState](https://kuzenbo.com/docs/hooks/use-datatable-state)
- [Datatable Architecture](https://kuzenbo.com/docs/foundations/datatable-architecture)

## 🛟 Safe Adoption Guidance

Until publish, treat this package as preview and keep critical data workflows under app-level abstractions.
