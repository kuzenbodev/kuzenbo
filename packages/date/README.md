# @kuzenbo/date

Date and calendar primitives with token-aware styling and slot composition.

> 🧪 **Status: Preview (Not Published Yet)**

## ✨ What This Package Targets

`@kuzenbo/date` provides `react-day-picker`-based calendar primitives tuned to Kuzenbo styling and composition patterns.

## 📦 Install (When Available)

```bash
bun add @kuzenbo/date @kuzenbo/core @kuzenbo/theme react-day-picker
```

```bash
npm install @kuzenbo/date @kuzenbo/core @kuzenbo/theme react-day-picker
```

```bash
pnpm add @kuzenbo/date @kuzenbo/core @kuzenbo/theme react-day-picker
```

```bash
yarn add @kuzenbo/date @kuzenbo/core @kuzenbo/theme react-day-picker
```

## ✅ Requirements

- React 19+
- `react-dom`
- `react-day-picker`
- `@kuzenbo/core`
- `@kuzenbo/theme`

## 🎨 Runtime Pairing

`@kuzenbo/date` is designed to run with `@kuzenbo/core` and `@kuzenbo/theme`.

## ⚡ Quick Example

```tsx
"use client";

import { useState } from "react";

import { Calendar } from "@kuzenbo/date";

export function DateQuickExample() {
  const [selected, setSelected] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      className="rounded-lg border"
      mode="single"
      onSelect={setSelected}
      selected={selected}
    />
  );
}
```

## 🧱 Expected Surface

- Components: `Calendar`
- Primitives: `CalendarRoot`, `CalendarChevron`, `CalendarDayButton`, `CalendarWeekNumber`
- Types: `CalendarProps` and slot prop types

## 📚 Docs And Related Routes

- [Calendar](https://kuzenbo.com/docs/components/calendar)
- [Popover](https://kuzenbo.com/docs/components/popover)
- [Input Group](https://kuzenbo.com/docs/components/input-group)

## 🛟 Safe Adoption Guidance

Until publish, use this package as preview-only and keep date selection behavior validated in your app integration tests.
