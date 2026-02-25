# Base UI Foundation Index

## Styling model

- `className` and `style` are accepted on most renderable parts and can be functions of component state.
- `render` can replace a host element but should preserve element semantics unless behavior is intentionally wrapped.
- `data-*` hooks and CSS variables are first-class for state-driven styling.

## Data and state examples

- `data-disabled`, `data-open`, `data-closed` are typical state selectors for interaction feedback.
- `data-state`, `data-side`, `data-align`, and similar positioning data attrs are commonly used by popup and list components.

## Composition patterns

- Use nested `render` when you need to merge semantic structure from app components.
- Prefer a simple `className` callback for frequent styling branches; keep render callbacks for semantic/structural changes.
- Ensure wrapper elements keep native roles/keyboard behavior when replacing base nodes.

## Accessibility notes

- Even with built-in focus management, you must provide visible focus styles (`:focus-visible`).
- Preserve accessible names using labels, `aria-label`, or `aria-labelledby` where required.
