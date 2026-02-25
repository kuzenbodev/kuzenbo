# Form API Snapshot

## Form root

- `onFormSubmit(formValues, eventDetails)` receives full values plus `Form.SubmitEventDetails`.
- `validationMode`: default `onSubmit`, can be overridden per `Field.Root`.

## Control components

- Common controlled/uncontrolled pairs:
  - `value` / `defaultValue`
  - `checked` / `defaultChecked`
  - `open` / `defaultOpen`
- Change/change-like callbacks use `(value, eventDetails)` where event details include `reason`, `event`, and cancellation helpers.

## Example

```tsx
<Form onFormSubmit={(values) => doSubmit(values)}>
  <Field.Root name="email">
    <Field.Label>Email</Field.Label>
    <Field.Control required />
    <Field.Error />
  </Field.Root>
</Form>
```

## Accessibility caveat

- Form-level wrappers preserve semantics only when labels and names are explicitly wired; missing names are a common source of hidden a11y regressions.
