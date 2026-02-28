import { highlightCodeToHtml } from "@kuzenbo/code/shiki/highlight-code";
import { CodeBlock } from "@kuzenbo/code/ui/code-block";
import { CodeBlockToolbar } from "@kuzenbo/code/ui/code-block-toolbar";
import type { ComponentPropsWithoutRef } from "react";

import {
  docsShikiThemes,
  extractLanguageFromClassName,
  flattenReactCodeChildrenToString,
  getCodeElementFromPreChildren,
  normalizeMarkdownCodeTrailingNewline,
} from "./mdx-code-utils";

export type MdxPreCodeBlockProps = ComponentPropsWithoutRef<"pre">;

const highlightDocsCodeBlock = async function highlightDocsCodeBlock(
  code: string,
  language: string | undefined
): Promise<string> {
  "use cache";

  return await highlightCodeToHtml({
    code,
    language,
    themes: docsShikiThemes,
  });
};

export const MdxPreCodeBlock = async ({
  children,
  ...props
}: MdxPreCodeBlockProps) => {
  const codeElement = getCodeElementFromPreChildren(children);

  if (!codeElement) {
    return <pre {...props}>{children}</pre>;
  }

  const rawCode = normalizeMarkdownCodeTrailingNewline(
    flattenReactCodeChildrenToString(codeElement.props.children)
  );
  const language = extractLanguageFromClassName(codeElement.props.className);
  const toolbar = <CodeBlockToolbar copyValue={rawCode} language={language} />;

  try {
    const highlightedHtml = await highlightDocsCodeBlock(rawCode, language);

    return (
      <CodeBlock
        code={rawCode}
        highlightedHtml={highlightedHtml}
        language={language}
        toolbar={toolbar}
        {...props}
      />
    );
  } catch {
    return (
      <CodeBlock
        code={rawCode}
        language={language}
        toolbar={toolbar}
        {...props}
      />
    );
  }
};
