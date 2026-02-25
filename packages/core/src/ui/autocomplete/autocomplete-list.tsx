import type { ComponentProps } from "react";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

export type AutocompleteListProps = ComponentProps<
  typeof BaseAutocomplete.List
>;

export const AutocompleteList = (props: AutocompleteListProps) => (
  <BaseAutocomplete.List data-slot="autocomplete-list" {...props} />
);
