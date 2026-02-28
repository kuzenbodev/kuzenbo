import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type CardTitleProps = ComponentProps<"div">;

const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <div
    className={cn(
      "leading-snug font-medium group-data-[size=lg]/card:text-base group-data-[size=md]/card:text-base group-data-[size=sm]/card:text-sm group-data-[size=xl]/card:text-lg group-data-[size=xs]/card:text-sm",
      className
    )}
    data-slot="card-title"
    {...props}
  />
);

export { CardTitle };
