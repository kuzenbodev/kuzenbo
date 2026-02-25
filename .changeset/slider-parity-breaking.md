---
"@kuzenbo/core": major
---

Slider and RangeSlider now follow a split API surface with normalized high-level behavior.

Breaking changes:

- Removed high-level passthrough overrides for Base UI parity-critical internals (`thumbAlignment`, `thumbCollisionBehavior`, `minStepsBetweenValues`).
- `name` handling is now explicit and standardized through Kuzenbo hidden inputs.

Migration notes:

- Single-value forms: use `name` + optional `hiddenInputProps`; submitted value is the scaled slider value.
- Range forms: use `name` + optional `hiddenInputProps`; submitted keys are `${name}_from` and `${name}_to` with raw tuple values.
- Replace label transition objects like `{ open, close }` with `labelTransitionProps={{ duration, timingFunction, delay }}`.
