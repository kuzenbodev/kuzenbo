# API Normalization (Final Public Contract)

## Naming and prop normalization decisions

- Keep component and hook names aligned with Mantine surface for migration clarity.
- Replace `type: 'default' | 'multiple' | 'range'` with `selectionMode: 'single' | 'multiple' | 'range'` across picker APIs.
- Keep `value/defaultValue/onChange` controlled contract unchanged in meaning.
- Keep `allowDeselect` and `allowSingleDateInRange` names for direct behavior correspondence.
- Keep `valueFormat`, `closeOnChange`, `sortDates`, and `labelSeparator` names to preserve behavioral meaning.
- Remove Mantine style/escape APIs from the public surface: no `classNames`, no `styles`, no `unstyled`, no static selectors.
- Remove public `__*` props; internal cross-component hooks remain private.
- Allow only root `className` extension plus explicit semantic prop APIs.
- Preserve hidden input props (`name`, `form`) for input wrappers.

## Public exported types (Kuzenbo)

- `DateStringValue`
- `DateTimeStringValue`
- `DateValue`
- `DatesRangeValue`
- `DateSelectionMode`
- Picker/input prop types
- Provider settings
- Adapter-facing formatter types
