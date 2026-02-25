# Portal and Lifecycle Notes

## Portal setup

- Add a stable stacking context root when docs suggest portal layering collisions.
- Keep detached triggers deterministic by using shared `handle` values.

## Lifecycle behavior

- Popup content typically mounts/unmounts based on root open state and may expose `keepMounted` for measurement-sensitive UIs.
- For nested overlays, track reason codes (`interaction` or custom reasons) instead of relying solely on boolean open state.

## Accessibility reminder

- If focus is programmatically moved, test with keyboard and screen-reader paths after composition or custom `render` wrappers.
