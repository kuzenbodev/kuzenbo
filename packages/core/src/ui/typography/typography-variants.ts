import { tv } from "tailwind-variants";

const typographyHeadingVariants = tv({
  base: "text-foreground tracking-tight",
  defaultVariants: {
    variant: "h2",
  },
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
});

const typographyTextVariants = tv({
  base: "text-foreground",
  defaultVariants: {
    variant: "body",
  },
  variants: {
    variant: {
      body: "text-base leading-7",
      caption: "text-muted-foreground text-xs leading-5",
      eyebrow:
        "text-foreground text-xs leading-5 font-semibold tracking-widest uppercase",
      lead: "text-muted-foreground text-xl leading-8",
      muted: "text-muted-foreground text-sm leading-6",
      overline:
        "text-muted-foreground text-xs leading-5 font-semibold tracking-wide uppercase",
      small: "text-sm leading-5 font-medium",
    },
  },
});

export { typographyHeadingVariants, typographyTextVariants };
