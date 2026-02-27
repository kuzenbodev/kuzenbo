import type { ComponentProps } from "react";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";

export type AutocompleteClearProps = ComponentProps<
  typeof BaseAutocomplete.Clear
>;

export const AutocompleteClear = ({
  className,
  ...props
}: AutocompleteClearProps) => (
  <BaseAutocomplete.Clear
    className={mergeBaseUIClassName<BaseAutocomplete.Clear.State>(
      "cursor-clickable",
      className
    )}
    data-slot="autocomplete-clear"
    {...props}
  />
);
