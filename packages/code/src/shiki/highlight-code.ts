import type { TransformerNotationHighlightOptions } from "@shikijs/transformers";
import type { BundledTheme, ShikiTransformer } from "shiki";

import {
  DEFAULT_SHIKI_THEME,
  ensureShikiLanguageLoaded,
  ensureShikiThemeLoaded,
  getShikiHighlighter,
} from "./shiki-highlighter";
import type { ShikiHighlighter } from "./shiki-highlighter";
import { resolveShikiLanguage } from "./shiki-language-map";
import { createShikiTransformers } from "./shiki-transformers";

export interface HighlightCodeOptions {
  code: string;
  language?: string | null;
  meta?: string;
  notationHighlight?: boolean | TransformerNotationHighlightOptions;
  theme?: BundledTheme;
  themes?: {
    dark: BundledTheme;
    light: BundledTheme;
  };
  transformers?: ShikiTransformer[];
}

export interface HighlightCodeResult {
  code: string;
  html: string;
  language: string;
  theme: BundledTheme;
  themes?: {
    dark: BundledTheme;
    light: BundledTheme;
  };
}

const INLINE_CODE_REGEX =
  /^<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>$/;

const getInlineHtmlFromCodeBlock = (html: string): string => {
  const inlineHtmlMatch = html.match(INLINE_CODE_REGEX);

  return inlineHtmlMatch?.[1] ?? html;
};

export const highlightCode = async (
  options: HighlightCodeOptions
): Promise<HighlightCodeResult> => {
  const highlighter = await getShikiHighlighter();
  const resolvedLanguage = await ensureShikiLanguageLoaded(
    highlighter,
    resolveShikiLanguage(options.language)
  );
  const requestedTheme = options.theme ?? DEFAULT_SHIKI_THEME;

  let resolvedTheme = await ensureShikiThemeLoaded(highlighter, requestedTheme);
  let resolvedThemes:
    | {
        dark: BundledTheme;
        light: BundledTheme;
      }
    | undefined;

  if (options.themes) {
    const resolvedLightTheme = await ensureShikiThemeLoaded(
      highlighter,
      options.themes.light
    );
    const resolvedDarkTheme = await ensureShikiThemeLoaded(
      highlighter,
      options.themes.dark
    );

    resolvedTheme = resolvedDarkTheme;
    resolvedThemes = {
      dark: resolvedDarkTheme,
      light: resolvedLightTheme,
    };
  }

  const baseHighlightOptions = {
    lang: resolvedLanguage,
    meta: options.meta ? { __raw: options.meta } : undefined,
    transformers: createShikiTransformers({
      notationHighlight: options.notationHighlight,
      transformers: options.transformers,
    }),
  };
  const highlightOptions: Parameters<ShikiHighlighter["codeToHtml"]>[1] =
    resolvedThemes
      ? {
          ...baseHighlightOptions,
          themes: resolvedThemes,
        }
      : {
          ...baseHighlightOptions,
          theme: resolvedTheme,
        };
  const html = highlighter.codeToHtml(options.code, highlightOptions);

  return {
    code: options.code,
    html,
    language: resolvedLanguage,
    theme: resolvedTheme,
    themes: resolvedThemes,
  };
};

export const highlightCodeToHtml = async (
  options: HighlightCodeOptions
): Promise<string> => {
  const highlightedCode = await highlightCode(options);

  return highlightedCode.html;
};

export const highlightInlineCode = async (
  options: HighlightCodeOptions
): Promise<HighlightCodeResult> => {
  const highlightedCode = await highlightCode(options);

  return {
    ...highlightedCode,
    html: getInlineHtmlFromCodeBlock(highlightedCode.html),
  };
};
