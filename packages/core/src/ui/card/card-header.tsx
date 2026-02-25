import type { ComponentProps } from "react";

import { cn } from "tailwind-variants";
export type CardHeaderProps = ComponentProps<"div">;

const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div
    className={cn(
      "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl group-data-[size=xs]/card:px-2.5 group-data-[size=sm]/card:px-3 group-data-[size=md]/card:px-5 group-data-[size=lg]/card:px-6 group-data-[size=xl]/card:px-7 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] group-data-[size=xs]/card:[.border-b]:pb-2.5 group-data-[size=sm]/card:[.border-b]:pb-3 group-data-[size=md]/card:[.border-b]:pb-5 group-data-[size=lg]/card:[.border-b]:pb-6 group-data-[size=xl]/card:[.border-b]:pb-7",
      className
    )}
    data-slot="card-header"
    {...props}
  />
);

export { CardHeader };
