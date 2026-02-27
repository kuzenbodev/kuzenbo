# Accessibility Matrix

## Required roles/semantics

- Calendar grids expose proper table/grid semantics with button controls.
- Level and navigation controls must have explicit accessible labels.
- Tab sequence remains deterministic (header controls + one active cell).

## Keyboard matrix

- Day/month/year grids: arrow navigation with wrapping and disabled/hidden skipping parity.
- Header controls: keyboard and focus parity with `preventFocus` behavior.
- Enhanced shortcuts parity: `Ctrl/Cmd+ArrowUp/Down`, `Ctrl/Cmd+Shift+ArrowUp/Down`, `Y`.
- TimePicker: spinbutton semantics, `Home/End`, `Backspace/Delete`, left/right field traversal, up/down increments.

## Screen reader labels

- Default day labels are localized.
- `getDayAriaLabel` override remains supported.
- Localized month/week labels are required.
- Hidden input serialization must mirror selected values.
