import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { ComponentProps } from "react";

export type AutocompleteCollectionProps = ComponentProps<
  typeof BaseAutocomplete.Collection
>;

export const AutocompleteCollection = (props: AutocompleteCollectionProps) => (
  <BaseAutocomplete.Collection data-slot="autocomplete-collection" {...props} />
);
