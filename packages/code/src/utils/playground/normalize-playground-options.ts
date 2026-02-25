import type {
  PlaygroundControlOption,
  PlaygroundSelectableOption,
} from "../../playground/playground-control-model";

const upperFirst = (value: string): string =>
  value.length === 0
    ? value
    : `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

export const normalizePlaygroundOptions = <TValue extends string>(
  options: readonly PlaygroundSelectableOption<TValue>[],
  transformLabels = true
): PlaygroundControlOption<TValue>[] =>
  options.map((option) => {
    if (typeof option === "string") {
      return {
        value: option,
        label: transformLabels ? upperFirst(option) : option,
      };
    }

    return {
      value: option.value,
      label: transformLabels ? upperFirst(option.label) : option.label,
    };
  });
