# Selection and Typeahead Pattern Notes

## Core patterns

- `Select` is value-based with optional basic keyboard typeahead.
- `Combobox` manages both input and selected values with `inputValue` and `value` (both can be controlled).
- `Autocomplete` supports free-text input plus suggestion filtering and selected-value behavior.

### Controlled strategy

- Prefer `defaultValue` for static lists and `value` when filtering or analytics requires single source of truth.
- Use shared option identity keys (`id`/`value`) across rerenders to avoid uncontrolled resets.

## API reminders

- `name`, `value`, `defaultValue`, `onValueChange`
- `inputValue` / `defaultInputValue` and `onInputValueChange` for combobox/autocomplete input models

```tsx
<Select.Root
  name="tier"
  value={value}
  onValueChange={(next, details) => {
    if (details.reason === "selection") setValue(next);
  }}
>
  <Select.Trigger>
    <Select.Value />
  </Select.Trigger>
  <Select.Positioner>
    <Select.Content>{/* options */}</Select.Content>
  </Select.Positioner>
</Select.Root>
```

## Practical defaults

- `Autocomplete` for free-form search
- `Combobox` for large/typed-filterable selection lists
- `Select` for fixed choices without large custom filtering

### State/events and a11y

- Keep list updates deterministic when suggestions stream asynchronously to prevent option index mismatch in keyboard navigation.
- Ensure selected value and input suggestions remain discoverable with `aria-live`-compatible copy for async loading/empty states.
