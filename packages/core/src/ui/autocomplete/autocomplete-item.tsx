import type { ComponentProps } from "react";

import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { useContext } from "react";
import { tv, type VariantProps } from "tailwind-variants";

import type { InputSize } from "../input/input";

import { mergeBaseUIClassName } from "../../utils/merge-base-ui-class-name";
import { AutocompleteOverlayContext } from "./autocomplete-overlay-context";

export type AutocompleteItemProps = ComponentProps<
  typeof BaseAutocomplete.Item
> &
  VariantProps<typeof autocompleteItemVariants>;

const autocompleteItemVariants = tv({
  base: "relative flex w-full cursor-clickable items-center rounded-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='text-'])]:text-muted-foreground",
  variants: {
    size: {
      xs: "gap-1 px-1.5 py-1 text-xs [&_svg:not([class*='size-'])]:size-3",
      sm: "gap-1.5 px-2 py-1 text-sm [&_svg:not([class*='size-'])]:size-3.5",
      md: "gap-2 px-2 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      lg: "gap-2 px-2.5 py-2 text-sm [&_svg:not([class*='size-'])]:size-4",
      xl: "gap-2.5 px-3 py-2.5 text-base [&_svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const AutocompleteItem = ({
  className,
  children,
  size,
  ...props
}: AutocompleteItemProps) => {
  const { size: overlaySize } = useContext(AutocompleteOverlayContext);
  const resolvedSize: InputSize = size ?? overlaySize ?? "md";

  return (
    <BaseAutocomplete.Item
      className={mergeBaseUIClassName<BaseAutocomplete.Item.State>(
        autocompleteItemVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="autocomplete-item"
      {...props}
    >
      {children}
    </BaseAutocomplete.Item>
  );
};
