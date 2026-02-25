# Typeahead Behavior

## Filtering and rendering semantics

- Keep item identity stable when filtering to avoid controlled/uncontrolled drift.
- Preserve option identity in async lists to avoid state reset after re-fetch.

## UX and accessibility

- For list empties, expose clear empty-state content.
- Ensure input and list are linked for assistive hints when filtering/search occurs.

## State/events

- `onValueChange` and `onInputValueChange` callbacks can include event detail metadata for analytics and reason-based behavior.
