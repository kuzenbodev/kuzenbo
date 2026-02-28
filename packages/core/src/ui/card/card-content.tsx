import type { ComponentProps } from "react";
import { cn } from "tailwind-variants";
export type CardContentProps = ComponentProps<"div">;

const CardContent = ({ className, ...props }: CardContentProps) => (
  <div
    className={cn(
      "group-data-[size=lg]/card:px-6 group-data-[size=md]/card:px-5 group-data-[size=sm]/card:px-3 group-data-[size=xl]/card:px-7 group-data-[size=xs]/card:px-2.5",
      className
    )}
    data-slot="card-content"
    {...props}
  />
);

export { CardContent };
