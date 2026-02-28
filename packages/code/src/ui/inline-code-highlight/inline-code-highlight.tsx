import type { ComponentPropsWithoutRef } from "react";
import { cn, tv } from "tailwind-variants";

const inlineCodeHighlightVariants = tv({
  base: "border-border bg-muted/40 text-foreground rounded-md border px-1.5 py-0.5 font-mono text-[0.875em]",
});

export interface InlineCodeHighlightProps extends Omit<
  ComponentPropsWithoutRef<"code">,
  "children"
> {
  code?: string;
  highlightedHtml?: string | null;
  language?: string;
}

export const InlineCodeHighlight = ({
  className,
  code,
  highlightedHtml,
  language,
  ...props
}: InlineCodeHighlightProps) => {
  const hasHighlightedHtml =
    typeof highlightedHtml === "string" && highlightedHtml.length > 0;

  if (hasHighlightedHtml) {
    return (
      <code
        className={cn(inlineCodeHighlightVariants(), className)}
        data-language={language}
        data-slot="inline-code-highlight"
        // oxlint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        {...props}
      />
    );
  }

  return (
    <code
      className={cn(inlineCodeHighlightVariants(), className)}
      data-language={language}
      data-slot="inline-code-highlight"
      {...props}
    >
      {code ?? ""}
    </code>
  );
};
