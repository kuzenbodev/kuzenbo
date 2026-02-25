import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type CardFooterProps = ComponentProps<"div">;

const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div
    className={cn(
      "flex items-center rounded-b-xl group-data-[size=xs]/card:px-2.5 group-data-[size=sm]/card:px-3 group-data-[size=md]/card:px-5 group-data-[size=lg]/card:px-6 group-data-[size=xl]/card:px-7 group-data-[size=xs]/card:pb-2.5 group-data-[size=sm]/card:pb-3 group-data-[size=md]/card:pb-5 group-data-[size=lg]/card:pb-6 group-data-[size=xl]/card:pb-7 group-data-[size=xs]/card:[.border-t]:pt-2.5 group-data-[size=sm]/card:[.border-t]:pt-3 group-data-[size=md]/card:[.border-t]:pt-5 group-data-[size=lg]/card:[.border-t]:pt-6 group-data-[size=xl]/card:[.border-t]:pt-7",
      className
    )}
    data-slot="card-footer"
    {...props}
  />
);

export { CardFooter };
