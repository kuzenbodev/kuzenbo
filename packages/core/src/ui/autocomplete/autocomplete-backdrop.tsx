import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import type { ComponentProps } from "react";

export type AutocompleteBackdropProps = ComponentProps<
  typeof BaseAutocomplete.Backdrop
>;

export const AutocompleteBackdrop = (props: AutocompleteBackdropProps) => (
  <BaseAutocomplete.Backdrop data-slot="autocomplete-backdrop" {...props} />
);
