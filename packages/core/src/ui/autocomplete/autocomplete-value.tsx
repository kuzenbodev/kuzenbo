import type { ComponentProps } from "react";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

export type AutocompleteValueProps = ComponentProps<
  typeof BaseAutocomplete.Value
>;

export const AutocompleteValue = (props: AutocompleteValueProps) => (
  <BaseAutocomplete.Value data-slot="autocomplete-value" {...props} />
);
