import type { ComponentProps } from "react";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

export type AutocompleteArrowProps = ComponentProps<
  typeof BaseAutocomplete.Arrow
>;

export const AutocompleteArrow = (props: AutocompleteArrowProps) => (
  <BaseAutocomplete.Arrow data-slot="autocomplete-arrow" {...props} />
);
