import { tv } from "tailwind-variants";

const typographyHeadingVariants = tv({
  base: "text-foreground tracking-tight",
  defaultVariants: {
    variant: "h2",
  },
  variants: {
    variant: {
      display:
        "text-[length:var(--kb-typography-heading-display-size,3rem)] leading-[var(--kb-typography-heading-display-line-height,3.75rem)] font-semibold text-balance",
      h1: "text-[length:var(--kb-typography-heading-h1-size,2.25rem)] leading-[var(--kb-typography-heading-h1-line-height,2.8125rem)] font-semibold text-balance",
      h2: "text-[length:var(--kb-typography-heading-h2-size,1.875rem)] leading-[var(--kb-typography-heading-h2-line-height,2.34375rem)] font-semibold text-balance",
      h3: "text-[length:var(--kb-typography-heading-h3-size,1.5rem)] leading-[var(--kb-typography-heading-h3-line-height,2.0625rem)] font-semibold",
      h4: "text-[length:var(--kb-typography-heading-h4-size,1.25rem)] leading-[var(--kb-typography-heading-h4-line-height,1.71875rem)] font-semibold",
      h5: "text-[length:var(--kb-typography-heading-h5-size,1.125rem)] leading-[var(--kb-typography-heading-h5-line-height,1.75rem)] font-semibold",
      h6: "text-[length:var(--kb-typography-heading-h6-size,1rem)] leading-[var(--kb-typography-heading-h6-line-height,1.5rem)] font-semibold",
      subheading:
        "text-muted-foreground text-[length:var(--kb-typography-heading-subheading-size,1.125rem)] leading-[var(--kb-typography-heading-subheading-line-height,1.75rem)] font-medium",
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
      body: "text-[length:var(--kb-typography-text-body-size,1rem)] leading-[var(--kb-typography-text-body-line-height,1.75rem)]",
      caption:
        "text-muted-foreground text-[length:var(--kb-typography-text-caption-size,0.75rem)] leading-[var(--kb-typography-text-caption-line-height,1.25rem)]",
      eyebrow:
        "text-foreground text-[length:var(--kb-typography-text-eyebrow-size,0.75rem)] leading-[var(--kb-typography-text-eyebrow-line-height,1.25rem)] font-semibold tracking-widest uppercase",
      lead: "text-muted-foreground text-[length:var(--kb-typography-text-lead-size,1.25rem)] leading-[var(--kb-typography-text-lead-line-height,2rem)]",
      muted:
        "text-muted-foreground text-[length:var(--kb-typography-text-muted-size,0.875rem)] leading-[var(--kb-typography-text-muted-line-height,1.5rem)]",
      overline:
        "text-muted-foreground text-[length:var(--kb-typography-text-overline-size,0.75rem)] leading-[var(--kb-typography-text-overline-line-height,1.25rem)] font-semibold tracking-wide uppercase",
      small:
        "text-[length:var(--kb-typography-text-small-size,0.875rem)] leading-[var(--kb-typography-text-small-line-height,1.25rem)] font-medium",
    },
  },
});

export { typographyHeadingVariants, typographyTextVariants };
