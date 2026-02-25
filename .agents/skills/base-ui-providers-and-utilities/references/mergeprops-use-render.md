# mergeProps and useRender

## mergeProps

- Merge props with special logic for `className`, `style`, `id`, and event handlers.
- Event handlers merge, not replace; later handlers still run in deterministic order.

```tsx
mergeProps(
  { className: "base", onClick: onBaseClick },
  { className: "override", onClick: onUiClick }
);
```

## useRender

- Provides typed helper props for render-friendly components.
- Useful for wrapper component authors that expose `render` while forwarding generic part props.
- Accessibility note: when rendering alternate elements with `render`, validate native behavior remains intact.

### Wrapper state/event caution

- Keep event props and `ref` forwarding in the returned render helper contract.
- Test cancellation helpers (`event.preventDefault` patterns) after switching to alternate element wrappers.
