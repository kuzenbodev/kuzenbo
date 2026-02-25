import { tv, type VariantProps } from "tailwind-variants";

import type { UISize } from "./calendar-size";

const calendarButtonVariants = tv({
  base: "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline:
        "border-border bg-background hover:bg-muted hover:text-foreground dark:border-input dark:bg-card dark:hover:bg-muted",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost:
        "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
      danger:
        "bg-danger text-danger-foreground hover:bg-danger/90 focus-visible:border-danger/40 focus-visible:ring-danger/30",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
      sm: "h-7 gap-1 rounded-[min(var(--radius-md),9px)] px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5",
      md: "h-8 gap-1.5 px-2.5 text-sm",
      lg: "h-9 gap-1.5 px-3 text-sm",
      xl: "h-10 gap-2 px-3.5 text-base [&_svg:not([class*='size-'])]:size-5",
      icon: "size-9",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type CalendarButtonVariants = VariantProps<typeof calendarButtonVariants>;

type CalendarButtonVariant = NonNullable<CalendarButtonVariants["variant"]>;
type CalendarButtonSize = UISize | "icon";

export { calendarButtonVariants };
export type { CalendarButtonSize, CalendarButtonVariant };
