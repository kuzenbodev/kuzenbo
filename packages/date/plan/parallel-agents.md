# Parallel Agents Task Graph

| Track | Ownership                                | Depends on | Deliverable                                                  |
| ----- | ---------------------------------------- | ---------- | ------------------------------------------------------------ |
| A     | Inventory + parity matrices              | none       | `packages/date/plan/*.md` discovery artifacts                |
| B     | Adapter core + adapter tests             | A          | `src/adapter/**`, `src/adapters/**`, adapter test suite      |
| C     | Provider/context/hook foundation         | B          | `src/context/**`, `src/hooks/**`, shared runtime wiring      |
| D     | Calendar primitive stack                 | C          | calendar day/month/list/level/group components               |
| E     | Picker + input composition stack         | C + D      | picker wrappers, input wrappers, hidden input parity         |
| F     | API normalization + root export contract | C + D + E  | canonical root exports, legacy leak cleanup, `XProps` parity |
| G     | Datetime/time integration stack          | C + D + E  | `DateTimePicker`, `time/**`, integration behavior            |
| H     | Stories + docs + showcase alignment      | F + G      | story baseline, docs parity updates, showcase readiness      |
| I     | Integrated quality pass                  | H          | workspace Storybook build + final validation report          |
