import { tv } from "tailwind-variants";

const buttonSharedVariants = tv({
  base: "cursor-clickable focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-danger aria-invalid:ring-danger/20 dark:aria-invalid:border-danger/50 dark:aria-invalid:ring-danger/40 inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-[transform,color,background-color,border-color,box-shadow] duration-100 ease-out outline-none select-none focus-visible:ring-[3px] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:ring-[3px] motion-reduce:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  defaultVariants: {
    variant: "default",
  },
  variants: {
    variant: {
      danger:
        "bg-danger text-danger-foreground hover:bg-danger/90 focus-visible:border-danger-foreground/40 focus-visible:ring-danger-foreground/30 dark:bg-danger dark:text-danger-foreground dark:hover:bg-danger/80 dark:focus-visible:ring-danger-foreground/40",
      default:
        "bg-primary text-primary-foreground hover:bg-primary/90 [a]:hover:bg-primary/80",
      ghost:
        "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
      link: "text-primary underline-offset-4 hover:underline",
      outline:
        "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-card dark:hover:bg-muted",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
    },
  },
});

export { buttonSharedVariants };
