# TypeScript Patterns

## Namespace contracts

- Most parts expose `Component.Root.Props`, `Component.Root.State`, plus nested namespaced event detail types.
- Change handlers often accept `(value, eventDetails)` where `eventDetails` contains reason and cancel helpers.

## Rendering helpers

- `useRender.ComponentProps` and `useRender.ElementProps` support custom wrappers while preserving prop contracts.

## Example

```ts
import { Button as BaseButton } from '@base-ui/react/button'

type ButtonProps = BaseButton.Root.Props

function Button(props: ButtonProps) {
  return <BaseButton.Root {...props} />
}
```

## Accessibility caveat

- Preserve native element contracts when aliasing render props to prevent regressions in keyboard/focus behavior.
