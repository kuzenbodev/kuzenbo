import type { ComponentPropsWithoutRef } from "react";

import { cn, tv } from "tailwind-variants";

const codeVariants = tv({
  base: "relative rounded bg-muted font-mono text-[0.85em] font-medium text-foreground",
  variants: {
    block: {
      true: "m-0 block overflow-x-auto px-3 py-2 leading-relaxed whitespace-pre",
      false: "px-[0.35rem] py-[0.2rem]",
    },
  },
  defaultVariants: {
    block: false,
  },
});

export interface CodeProps extends ComponentPropsWithoutRef<"code"> {
  block?: boolean;
}

const Code = ({ block = false, className, ...props }: CodeProps) => (
  <code
    className={cn(codeVariants({ block }), className)}
    data-block={block ? "true" : undefined}
    data-slot="code"
    {...props}
  />
);

export { Code };
