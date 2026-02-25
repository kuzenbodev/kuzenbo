# Overlay and Popup Patterns

## Shared anatomy

- Overlay roots commonly expose: `Root`, `Trigger`, `Portal`, `Backdrop`, `Positioner`, `Popup`, and action parts.
- State props: controlled/uncontrolled with `open` + `defaultOpen`, plus `onOpenChange` handlers.
- Composition pattern: keep trigger/content in separate nodes so focus and dismissal logic can be composed with portals.

## Focus and escape

- `initialFocus` / `finalFocus` are primary hooks for focus continuity.
- Escape handling should be preserved unless explicitly suppressed; prefer reason-aware cancellation in handlers rather than global overrides.

### Example

```tsx
<Dialog.Root
  defaultOpen={false}
  onOpenChange={(open, details) => {
    if (details.reason === "escape") {
      track("dialog-closed", details.reason);
    }
    return open;
  }}
>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Close>Close</Dialog.Close>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

## Data/state and transitions

- Typical state data attrs include `data-open`, `data-closed`, `data-starting-style`, `data-ending-style`.
- Use transition attributes in CSS when customizing open/close animation timing.

### Accessibility and state caveat

- Preserve ESC + outside interaction behavior unless a design exception is explicitly tested with keyboard and screen-reader paths.
