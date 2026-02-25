import type { ComponentProps } from "react";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { AutocompleteOverlayContext } from "./autocomplete-overlay-context";

export type AutocompleteGroupLabelProps = ComponentProps<
  typeof BaseAutocomplete.GroupLabel
> &
  VariantProps<typeof autocompleteGroupLabelVariants>;

const autocompleteGroupLabelVariants = tv({
  base: "font-medium text-muted-foreground",
  variants: {
    size: {
      xs: "px-1.5 py-1 text-xs",
      sm: "px-2 py-1 text-xs",
      md: "px-2 py-1.5 text-xs",
      lg: "px-2.5 py-1.5 text-sm",
      xl: "px-3 py-2 text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const AutocompleteGroupLabel = ({
  className,
  size,
  ...props
}: AutocompleteGroupLabelProps) => {
  const { size: overlaySize } = useContext(AutocompleteOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <BaseAutocomplete.GroupLabel
      className={mergeBaseUIClassName<BaseAutocomplete.GroupLabel.State>(
        autocompleteGroupLabelVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="autocomplete-group-label"
      {...props}
    />
  );
};
