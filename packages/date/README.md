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

## 📏 Size Precedence Contract

`Calendar` resolves size in this order:

1. explicit `size` prop
2. provider component defaults (`components.Calendar.defaultProps.size`)
3. provider global default size (`defaultSize`)
4. fallback `md`

Resolved size is emitted as `data-size` on the calendar root and calendar day button surfaces for token- and group-based styling.

## ⚡ Quick Example

```tsx
"use client";

import { useState } from "react";

import { Calendar } from "@kuzenbo/date/ui/calendar";

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
