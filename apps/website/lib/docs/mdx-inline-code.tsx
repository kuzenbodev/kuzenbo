import { highlightInlineCode } from "@kuzenbo/code/shiki/highlight-code";
import { InlineCodeHighlight } from "@kuzenbo/code/ui/inline-code-highlight";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "tailwind-variants";

import {
  docsShikiThemes,
  extractLanguageFromClassName,
  flattenReactCodeChildrenToString,
  normalizeMarkdownCodeTrailingNewline,
} from "./mdx-code-utils";

export type MdxInlineCodeProps = ComponentPropsWithoutRef<"code">;

const highlightDocsInlineCode = async function highlightDocsInlineCode(
  code: string,
  language: string
): Promise<string> {
  "use cache";

  const highlightedCode = await highlightInlineCode({
    code,
    language,
    themes: docsShikiThemes,
  });

  return highlightedCode.html;
};

export const MdxInlineCode = async ({
  children,
  className,
  ...props
}: MdxInlineCodeProps) => {
  const rawCode = normalizeMarkdownCodeTrailingNewline(
    flattenReactCodeChildrenToString(children)
  );
  const isLikelyFencedCodeChild = rawCode.includes("\n");
  const language = extractLanguageFromClassName(className);

  if (isLikelyFencedCodeChild) {
    return (
      <code className={className} {...props}>
        {rawCode}
      </code>
    );
  }

  if (!language) {
    return (
      <InlineCodeHighlight className={className} code={rawCode} {...props} />
    );
  }

  try {
    const highlightedHtml = await highlightDocsInlineCode(rawCode, language);

    return (
      <InlineCodeHighlight
        className={cn(className, "shiki")}
        code={rawCode}
        highlightedHtml={highlightedHtml}
        language={language}
        suppressHydrationWarning
        {...props}
      />
    );
  } catch {
    return (
      <InlineCodeHighlight
        className={className}
        code={rawCode}
        language={language}
        {...props}
      />
    );
  }
};
