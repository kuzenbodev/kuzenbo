import type { ComponentProps } from "react";
import { useContext } from "react";
import { cn, tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

import { Separator } from "../separator/separator";
import type { UISize } from "../shared/size/size-system";
import { ButtonGroupSizeContext } from "./button-group-size-context";

const buttonGroupSeparatorVariants = tv({
  base: "bg-input relative self-stretch data-[orientation=horizontal]:w-auto data-[orientation=vertical]:h-auto",
  defaultVariants: {
    size: "md",
  },
  variants: {
    size: {
      lg: "data-[orientation=horizontal]:mx-0.5 data-[orientation=vertical]:my-0.5",
      md: "data-[orientation=horizontal]:mx-px data-[orientation=vertical]:my-px",
      sm: "data-[orientation=horizontal]:mx-px data-[orientation=vertical]:my-px",
      xl: "data-[orientation=horizontal]:mx-0.5 data-[orientation=vertical]:my-0.5",
      xs: "data-[orientation=horizontal]:mx-px data-[orientation=vertical]:my-px",
    },
  },
});

type ButtonGroupSeparatorVariantProps = Omit<
  VariantProps<typeof buttonGroupSeparatorVariants>,
  "size"
> & {
  size?: UISize;
};

export type ButtonGroupSeparatorProps = ComponentProps<typeof Separator> &
  ButtonGroupSeparatorVariantProps;

const ButtonGroupSeparator = ({
  className,
  orientation = "vertical",
  size,
  ...props
}: ButtonGroupSeparatorProps) => {
  const { size: groupSize } = useContext(ButtonGroupSizeContext);
  const resolvedSize = size ?? groupSize ?? "md";

  return (
    <Separator
      className={cn(
        buttonGroupSeparatorVariants({ size: resolvedSize }),
        className
      )}
      data-size={resolvedSize}
      data-slot="button-group-separator"
      orientation={orientation}
      {...props}
    />
  );
};

export { ButtonGroupSeparator };
