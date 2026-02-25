import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from "react";

import {
  highlightCodeToHtml,
  resolveShikiLanguage,
  SHIKI_FALLBACK_LANGUAGE,
} from "@kuzenbo/code";
import { Children, isValidElement } from "react";

import { docsShikiThemeStyles } from "./mdx-shiki-theme-styles";

const HIGHLIGHT_MARKER_PATTERN =
  /\s*(?:\/\/|#|<!--)\s*\[!code\s+highlight\]\s*(?:-->)?\s*$/u;
const LINE_SPAN_TOKEN = '<span class="line">';
const HIGHLIGHTED_LINE_SPAN_TOKEN =
  '<span class="line" data-highlighted-line="true">';

const KNOWN_FALLBACK_LANGUAGE_TOKENS = new Set<string>([
  SHIKI_FALLBACK_LANGUAGE,
  "text",
  "txt",
]);

interface ExtractedHighlightNotation {
  code: string;
  highlightedLines: number[];
}

interface ExtractedPreCodeBlock {
  code: string;
  language: string;
}

interface CodeElementProps {
  children?: ReactNode;
  className?: string;
}

const shikiThemes = {
  dark: "github-dark-default",
  light: "github-light-default",
} as const;

const getFirstFenceLanguageToken = (languageValue: string): string => {
  const trimmedValue = languageValue.trim().toLowerCase();
  if (trimmedValue.length === 0) {
    return "";
  }

  const [token] = trimmedValue.split(/\s+/u);
  return token ?? "";
};

export const resolveCodeFenceLanguage = (
  languageValue: string
): string | null => {
  const languageToken = getFirstFenceLanguageToken(languageValue);
  if (languageToken.length === 0) {
    return null;
  }

  const resolvedLanguage = resolveShikiLanguage(languageToken);

  if (
    resolvedLanguage === SHIKI_FALLBACK_LANGUAGE &&
    !KNOWN_FALLBACK_LANGUAGE_TOKENS.has(languageToken)
  ) {
    return null;
  }

  return resolvedLanguage;
};

export const normalizeCodeFenceLanguage = (languageValue: string): string =>
  resolveCodeFenceLanguage(languageValue) ?? SHIKI_FALLBACK_LANGUAGE;

export const extractHighlightNotation = (
  code: string
): ExtractedHighlightNotation => {
  const lines = code.split(/\r?\n/u);
  const highlightedLines: number[] = [];
  const cleanedLines = lines.map((line, index) => {
    if (!HIGHLIGHT_MARKER_PATTERN.test(line)) {
      return line;
    }

    highlightedLines.push(index + 1);
    return line.replace(HIGHLIGHT_MARKER_PATTERN, "").trimEnd();
  });

  return {
    code: cleanedLines.join("\n"),
    highlightedLines,
  };
};

export const applyHighlightedLineMarkup = (
  html: string,
  highlightedLines: readonly number[]
): string => {
  if (highlightedLines.length === 0) {
    return html;
  }

  const highlightedLineSet = new Set(highlightedLines);
  let currentLine = 0;

  return html.replaceAll(LINE_SPAN_TOKEN, () => {
    currentLine += 1;

    if (!highlightedLineSet.has(currentLine)) {
      return LINE_SPAN_TOKEN;
    }

    return HIGHLIGHTED_LINE_SPAN_TOKEN;
  });
};

const stringifyNode = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((value) => stringifyNode(value)).join("");
  }

  return "";
};

const isCodeElement = (
  value: ReactNode
): value is ReactElement<CodeElementProps> =>
  isValidElement<CodeElementProps>(value) && value.type === "code";

const extractCodeBlockFromPreChildren = (
  children: ReactNode
): ExtractedPreCodeBlock | null => {
  const childNodes = Children.toArray(children);
  if (childNodes.length !== 1) {
    return null;
  }

  const [firstChild] = childNodes;
  if (!isCodeElement(firstChild)) {
    return null;
  }

  const className =
    typeof firstChild.props.className === "string"
      ? firstChild.props.className
      : "";
  const matchedLanguage = className.match(/(?:^|\s)language-([^\s]+)/u)?.[1];
  const language = normalizeCodeFenceLanguage(
    matchedLanguage ?? SHIKI_FALLBACK_LANGUAGE
  );
  const code = stringifyNode(firstChild.props.children);

  return { code, language };
};

const highlightCodeWithShiki = async (
  code: string,
  language: string
): Promise<string> => {
  try {
    return await highlightCodeToHtml({
      code,
      language,
      notationHighlight: false,
      themes: shikiThemes,
    });
  } catch {
    return highlightCodeToHtml({
      code,
      language: SHIKI_FALLBACK_LANGUAGE,
      notationHighlight: false,
      themes: shikiThemes,
    });
  }
};

const createHighlightedCodeHtml = async (
  code: string,
  language: string,
  highlightedLineSignature: string
): Promise<string> => {
  "use cache";

  const highlightedLines =
    highlightedLineSignature.length === 0
      ? []
      : highlightedLineSignature
          .split(",")
          .map((value) => Number.parseInt(value, 10))
          .filter((value) => Number.isInteger(value) && value > 0);

  const highlightedHtml = await highlightCodeWithShiki(code, language);
  return applyHighlightedLineMarkup(highlightedHtml, highlightedLines);
};

type MdxPreAdapterProps = ComponentPropsWithoutRef<"pre">;

export const MdxPreAdapter = async ({
  children,
  className,
}: MdxPreAdapterProps) => {
  const extractedCodeBlock = extractCodeBlockFromPreChildren(children);
  if (!extractedCodeBlock) {
    return <pre className={className}>{children}</pre>;
  }

  const highlightedNotation = extractHighlightNotation(extractedCodeBlock.code);
  const highlightedLineSignature =
    highlightedNotation.highlightedLines.join(",");
  const highlightedHtml = await createHighlightedCodeHtml(
    highlightedNotation.code,
    extractedCodeBlock.language,
    highlightedLineSignature
  );

  const mergedClassName = [docsShikiThemeStyles.wrapper, className]
    .filter((value) => typeof value === "string" && value.length > 0)
    .join(" ");

  return (
    <div
      className={mergedClassName}
      data-language={extractedCodeBlock.language}
      data-slot="docs-mdx-code-block"
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
    />
  );
};
