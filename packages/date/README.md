# @kuzenbo/date

Mantine parity date primitives rebuilt for Kuzenbo.

> 🚧 Preview package · not published yet

## ✨ Highlights

- 🗓️ Calendar primitives (`Calendar`, `Day`, `Month`, `WeekdaysRow`, level groups)
- 🎯 Canonical `selectionMode` API (`single`, `multiple`, `range`)
- 🧩 Input primitives (`DateInput`, `DatePickerInput`, `MonthPickerInput`, `YearPickerInput`)
- ⏰ Time primitives (`TimeInput`, `TimePicker`, `TimeGrid`, `TimeValue`, `DateTimePicker`)
- 🌍 Locale + timezone support through `DatesProvider`
- ↔️ RTL-aware behavior with provider direction controls
- ♿ Accessibility-first labels, keyboard flows, and focus behavior
- 🎨 Tailwind Variants styling with Kuzenbo semantic tokens

## 📦 Install (when available)

```bash
bun add @kuzenbo/date @kuzenbo/core @kuzenbo/theme
```

```bash
npm install @kuzenbo/date @kuzenbo/core @kuzenbo/theme
```

```bash
pnpm add @kuzenbo/date @kuzenbo/core @kuzenbo/theme
```

```bash
yarn add @kuzenbo/date @kuzenbo/core @kuzenbo/theme
```

## ✅ Requirements

- React 19+
- `react-dom`
- `@kuzenbo/core`
- `@kuzenbo/theme`

## 🚀 Quick Example

```tsx
import { DatePicker, DatesProvider } from "@kuzenbo/date";
import { useState } from "react";

export function BookingExample() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <DatesProvider firstDayOfWeek={1} locale="en-US" timeZone="UTC">
      <DatePicker
        selectionMode="range"
        value={value}
        onChange={(nextValue) => {
          setValue(nextValue as [Date | null, Date | null]);
        }}
      />
    </DatesProvider>
  );
}
```

## 🧭 API Snapshot

- Use `selectionMode` as the public mode prop on picker surfaces.
- Use `DatesProvider` root props (`locale`, `timeZone`, `firstDayOfWeek`, `weekendDays`, `direction`) for runtime configuration.
- Import from `@kuzenbo/date` package root; avoid internal/deep imports.

## 🗂️ Source Layout

- 🧩 `src/components/**` keeps UI primitives grouped by feature (`calendar`, `inputs`, `pickers`, `time`)
- 🛠️ Component-scoped helpers live next to their feature in `components/*/utils/**`
- 🧪 Tests are colocated by ownership (`components/*/tests`, `hooks/tests`, `adapter/tests`, `utils/tests`)
- 📚 Stories stay feature-local in `components/*/stories/**`
- 🔧 Shared package utilities remain in `src/utils/**`

## 🧠 Adapter Model

All date operations flow through one adapter boundary:

- `date-fns`
- `@date-fns/utc`
- `@date-fns/tz`

This keeps parsing/formatting/comparison/timezone behavior deterministic across components.
