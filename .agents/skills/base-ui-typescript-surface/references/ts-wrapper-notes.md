# Wrapper Type Notes

## Safe wrapper strategy

- Reuse Base UI namespaced types rather than duplicating prop interfaces.
- Keep state generics aligned when wrapping `render`-driven components.

## Anti-patterns

- Don’t widen event payload types (remove reasons/cancel helpers) unless explicitly adapting to a legacy boundary.
- Don’t override focus lifecycle semantics to avoid breaking keyboard accessibility.
