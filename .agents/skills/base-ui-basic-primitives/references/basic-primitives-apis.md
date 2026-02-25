# Basic Primitive Notes

## Avatar

- Primarily cosmetic control; keep size/shape conventions in wrapper components.
- Composition note: prefer wrapper-level sizing props instead of replacing the root element, unless semantic role requirements change.

## Button

- Focusable when disabled via `focusableWhenDisabled`; `nativeButton` controls default native semantics.
- Accessibility caveat: preserve button role/keyboard semantics when rendering alternate tags.

### API pattern

```tsx
<Button.Root render={<button />} />
<Button.Root
  focusableWhenDisabled={false}
  disabled
  onClick={(event) => {
    console.log(event.type)
  }}
/>
```

## Meter/Progress

- `value`, `min`, `max`, and formatter props are key for accessible numeric display.
- Prefer `aria` label context from surrounding form text where needed.

### State/events note

- Use controlled `value` for animation-sensitive UIs; with unconstrained indeterminate states prefer `max` plus visual fallback.
- `onValueChange` style callbacks can be used for live-readout instrumentation, but debounce to avoid render churn.

## Scroll Area

- Useful for custom scrollbars and nested overflow containers.
- Watch touch/pointer propagation in embedded popups.

```tsx
<ScrollArea.Root>
  <ScrollArea.Viewport>
    <ScrollArea.Content>...</ScrollArea.Content>
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar />
</ScrollArea.Root>
```

## Separator

- Non-visual semantics should remain in sync with heading/group boundaries and not break reading flow.

### Accessibility caveat

- If the separator is informational only, keep `role` conservative and avoid hiding surrounding landmarks with visual-only wrappers.
