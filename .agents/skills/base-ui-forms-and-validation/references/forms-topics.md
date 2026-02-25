# Base UI Forms

## Core model

- `Form` provides consolidated submit handling and error mapping.
- `validationMode` supports `onSubmit`, `onBlur`, and `onChange`.
- `Field.Root` plus `Field.Control`, `Field.Label`, `Field.Description`, `Field.Error` build accessible labeling and status wiring.

## Component grouping semantics

- Use `Fieldset` for grouped inputs sharing labels and collective validation semantics.
- `CheckboxGroup` and `ToggleGroup` are shared-state wrappers with parent/child value propagation.

## Accessibility

- Every form control should have an explicit accessible name (`Label`, `aria-label`, or `aria-labelledby`).
- Native `required`, `disabled`, and validation constraints integrate with browser behavior where possible.
