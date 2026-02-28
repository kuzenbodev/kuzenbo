import type { ComponentPropsWithoutRef } from "react";
import { cn, tv } from "tailwind-variants";

const codeVariants = tv({
  base: "bg-muted text-foreground relative rounded font-mono text-[0.85em] font-medium",
  defaultVariants: {
    block: false,
  },
  variants: {
    block: {
      false: "px-[0.35rem] py-[0.2rem]",
      true: "m-0 block overflow-x-auto px-3 py-2 leading-relaxed whitespace-pre",
    },
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
