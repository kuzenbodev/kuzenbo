import { tv } from "tailwind-variants";

const typographyHeadingVariants = tv({
  base: "tracking-tight text-foreground",
  variants: {
    variant: {
      display: "text-5xl leading-tight font-semibold text-balance",
      h1: "text-4xl leading-tight font-semibold text-balance",
      h2: "text-3xl leading-tight font-semibold text-balance",
      h3: "text-2xl leading-snug font-semibold",
      h4: "text-xl leading-snug font-semibold",
      h5: "text-lg leading-7 font-semibold",
      h6: "text-base leading-6 font-semibold",
      subheading: "text-lg leading-7 font-medium text-muted-foreground",
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
      lead: "text-xl leading-8 text-muted-foreground",
      muted: "text-sm leading-6 text-muted-foreground",
      small: "text-sm leading-5 font-medium",
      caption: "text-xs leading-5 text-muted-foreground",
      overline:
        "text-xs leading-5 font-semibold tracking-wide text-muted-foreground uppercase",
      eyebrow:
        "text-xs leading-5 font-semibold tracking-widest text-foreground uppercase",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export { typographyHeadingVariants, typographyTextVariants };
