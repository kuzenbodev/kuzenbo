import { createHighlighter } from "shiki";
import type {
  BundledLanguage,
  BundledTheme,
  Highlighter,
  SpecialLanguage,
} from "shiki";

export type ShikiLanguage = BundledLanguage | SpecialLanguage;
export type ShikiTheme = BundledTheme;
export type ShikiHighlighter = Highlighter;

export const DEFAULT_SHIKI_THEME: ShikiTheme = "github-dark-default";
export const DEFAULT_SHIKI_LANGUAGES: readonly ShikiLanguage[] = [
  "bash",
  "plaintext",
  "javascript",
  "typescript",
  "tsx",
  "json",
] as const;

let highlighterInstance: ShikiHighlighter | null = null;
let highlighterPromise: Promise<ShikiHighlighter> | null = null;
let highlighterLifecycle = 0;

class StaleShikiHighlighterError extends Error {
  constructor() {
    super("Shiki highlighter reset during initialization.");
  }
}

const createShikiHighlighter = () =>
  createHighlighter({
    langs: [...DEFAULT_SHIKI_LANGUAGES],
    themes: [DEFAULT_SHIKI_THEME],
  });

const createShikiHighlighterForLifecycle = async (
  lifecycle: number
): Promise<ShikiHighlighter> => {
  const instance = await createShikiHighlighter();

  if (lifecycle !== highlighterLifecycle) {
    instance.dispose();
    throw new StaleShikiHighlighterError();
  }

  highlighterInstance = instance;
  return instance;
};

export const getShikiHighlighter = async (): Promise<ShikiHighlighter> => {
  while (true) {
    if (highlighterInstance) {
      return highlighterInstance;
    }

    if (!highlighterPromise) {
      highlighterPromise =
        createShikiHighlighterForLifecycle(highlighterLifecycle);
    }

    const pendingPromise = highlighterPromise;

    try {
      return await pendingPromise;
    } catch (error) {
      if (highlighterPromise === pendingPromise) {
        highlighterPromise = null;
      }

      if (error instanceof StaleShikiHighlighterError) {
        continue;
      }

      throw error;
    }
  }
};

export const resetShikiHighlighter = async (): Promise<void> => {
  highlighterLifecycle += 1;

  const pendingInstance = highlighterInstance;
  const pendingPromise = highlighterPromise;

  highlighterInstance = null;
  highlighterPromise = null;

  if (pendingInstance) {
    pendingInstance.dispose();
    return;
  }

  if (pendingPromise) {
    try {
      const resolvedPendingInstance = await pendingPromise;
      resolvedPendingInstance.dispose();
    } catch {
      // noop: failed highlighter bootstrap has no disposable instance.
    }
  }
};

export const ensureShikiLanguageLoaded = async (
  highlighter: ShikiHighlighter,
  language: ShikiLanguage
): Promise<ShikiLanguage> => {
  if (language === "ansi" || language === "text" || language === "plaintext") {
    return language;
  }

  if (highlighter.getLoadedLanguages().includes(language)) {
    return language;
  }

  try {
    await highlighter.loadLanguage(language);
    return language;
  } catch {
    return "plaintext";
  }
};

export const ensureShikiThemeLoaded = async (
  highlighter: ShikiHighlighter,
  theme: ShikiTheme
): Promise<ShikiTheme> => {
  if (highlighter.getLoadedThemes().includes(theme)) {
    return theme;
  }

  try {
    await highlighter.loadTheme(theme);
    return theme;
  } catch {
    return DEFAULT_SHIKI_THEME;
  }
};
