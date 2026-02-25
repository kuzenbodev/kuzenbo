# Base UI Composition Patterns

## Recommended compositions

- Wrap Base UI parts with app components using `render` where your design system expects branded semantics.
- Forward unknown props to keep refs and event handlers intact.
- Use composition for `Dialog`/`Popover` nesting and shared trigger semantics.

## State-driven styling

```tsx
<Switch.Thumb
  className={(state) => (state.checked ? "bg-green-500" : "bg-gray-200")}
/>
```

## Accessibility and safety caveats

- Do not over-nest callbacks when static DOM trees are sufficient; each callback layer increases render complexity.
- Validate focus movement after composition changes with keyboard, especially when using nested popups/menus.

## Event customization

- Change handlers pass `ChangeEventDetails` objects and reasons; use these to cancel or adjust behavior, and avoid breaking default accessibility flows.
