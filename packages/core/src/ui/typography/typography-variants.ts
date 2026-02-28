import { tv } from "tailwind-variants";

const typographyHeadingVariants = tv({
  base: "text-foreground tracking-tight",
  variants: {
    variant: {
      display: "text-5xl leading-tight font-semibold text-balance",
      h1: "text-4xl leading-tight font-semibold text-balance",
      h2: "text-3xl leading-tight font-semibold text-balance",
      h3: "text-2xl leading-snug font-semibold",
      h4: "text-xl leading-snug font-semibold",
      h5: "text-lg leading-7 font-semibold",
      h6: "text-base leading-6 font-semibold",
      subheading: "text-muted-foreground text-lg leading-7 font-medium",
    },
  },
  defaultVariants: {
    variant: "h2",
  },
});

const typographyTextVariants = tv({
  base: "text-foreground",
  variants: {
    variant: {
      body: "text-base leading-7",
      lead: "text-muted-foreground text-xl leading-8",
      muted: "text-muted-foreground text-sm leading-6",
      small: "text-sm leading-5 font-medium",
      caption: "text-muted-foreground text-xs leading-5",
      overline:
        "text-muted-foreground text-xs leading-5 font-semibold tracking-wide uppercase",
      eyebrow:
        "text-foreground text-xs leading-5 font-semibold tracking-widest uppercase",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export { typographyHeadingVariants, typographyTextVariants };
