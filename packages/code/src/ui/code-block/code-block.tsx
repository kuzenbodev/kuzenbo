import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn, tv } from "tailwind-variants";

const codeBlockVariants = tv({
  slots: {
    body: "[&_span.line.highlighted]:bg-primary/10 overflow-x-auto [&_code]:font-mono [&_code]:text-sm [&_pre]:m-0 [&_pre]:min-w-full [&_pre]:border-0 [&_pre]:bg-transparent [&_pre]:p-4",
    rawCode: "font-mono text-sm",
    rawPre: "m-0 min-w-full border-0 bg-transparent p-4",
    root: "border-border bg-muted/40 text-foreground overflow-hidden rounded-lg border",
    toolbar: "border-border border-b",
  },
});

export interface CodeBlockProps extends Omit<
  ComponentPropsWithoutRef<"figure">,
  "children"
> {
  code?: string;
  codeClassName?: string;
  highlightedHtml?: string | null;
  language?: string;
  preClassName?: string;
  toolbar?: ReactNode;
}

export const CodeBlock = ({
  className,
  code,
  codeClassName,
  highlightedHtml,
  language,
  preClassName,
  toolbar,
  ...props
}: CodeBlockProps) => {
  const {
    body,
    rawCode,
    rawPre,
    root,
    toolbar: toolbarStyles,
  } = codeBlockVariants();
  const hasHighlightedHtml =
    typeof highlightedHtml === "string" && highlightedHtml.length > 0;

  return (
    <figure className={cn(root(), className)} data-slot="code-block" {...props}>
      {toolbar ? (
        <div className={toolbarStyles()} data-slot="code-block-toolbar">
          {toolbar}
        </div>
      ) : null}
      {hasHighlightedHtml ? (
        <div
          className={body()}
          data-language={language}
          data-slot="code-block-body"
          // oxlint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <div className={body()} data-slot="code-block-body">
          <pre
            className={cn(rawPre(), preClassName)}
            data-slot="code-block-pre"
          >
            <code
              className={cn(rawCode(), codeClassName)}
              data-language={language}
              data-slot="code-block-code"
            >
              {code ?? ""}
            </code>
          </pre>
        </div>
      )}
    </figure>
  );
};
