# Disclosure and Tabs

## Controlled/uncontrolled

- Root components generally support `default*` for uncontrolled and `*` for controlled operation.
- Controlled state should avoid mixing with uncontrolled props.

## State behavior

- Accordion and Collapsible: open state drives panel mounting and transition attributes.
- Tabs: `value` and `active` states drive indicator and panel sync.

## Accessibility

- Preserve keyboard bindings (arrow/Home/End when applicable) and active/focus sync.

```tsx
<Tabs.Root value="overview" onValueChange={(value) => setTab(value)}>
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="api">API</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">...</Tabs.Panel>
</Tabs.Root>
```
