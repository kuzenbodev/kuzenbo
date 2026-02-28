import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import type { UISize } from "../shared/size/size-system";
import { ButtonGroupSizeContext } from "./button-group-size-context";

const buttonGroupTextVariants = tv({
  base: "border-border bg-muted flex items-center border font-medium [&_svg]:pointer-events-none",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "gap-2 rounded-md px-3 text-sm [&_svg:not([class*='size-'])]:size-4",
      md: "gap-2 rounded-md px-2.5 text-sm [&_svg:not([class*='size-'])]:size-4",
      sm: "gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 text-sm [&_svg:not([class*='size-'])]:size-3.5",
      xl: "gap-2.5 rounded-md px-4 text-base [&_svg:not([class*='size-'])]:size-5",
      xs: "gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
    },
  },
});

type ButtonGroupTextVariantProps = Omit<
  VariantProps<typeof buttonGroupTextVariants>,
  "size"
> & {
  size?: UISize;
};

export type ButtonGroupTextProps = useRender.ComponentProps<"div"> &
  ButtonGroupTextVariantProps;

const ButtonGroupText = ({
  className,
  render,
  size,
  ...props
}: ButtonGroupTextProps) => {
  const { size: groupSize } = useContext(ButtonGroupSizeContext);
  const resolvedSize = size ?? groupSize ?? "md";

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(
          buttonGroupTextVariants({ size: resolvedSize }),
          className
        ),
      },
      props
    ),
    render,
    state: {
      size: resolvedSize,
      slot: "button-group-text",
    },
  });
};

export { ButtonGroupText };
