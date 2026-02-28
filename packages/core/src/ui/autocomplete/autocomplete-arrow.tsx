import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { ComponentProps } from "react";

export type AutocompleteArrowProps = ComponentProps<
  typeof BaseAutocomplete.Arrow
>;

export const AutocompleteArrow = (props: AutocompleteArrowProps) => (
  <BaseAutocomplete.Arrow data-slot="autocomplete-arrow" {...props} />
);
