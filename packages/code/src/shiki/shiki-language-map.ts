import { bundledLanguages, bundledLanguagesAlias } from "shiki";

import type { ShikiLanguage } from "./shiki-highlighter";

const SHIKI_LANGUAGE_ALIASES = {
  npm: "bash",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
} as const;

const hasOwnProperty = <T extends object>(value: string, obj: T): boolean =>
  Object.hasOwn(obj, value);

export const SHIKI_FALLBACK_LANGUAGE: ShikiLanguage = "plaintext";
export const shikiLanguageAliasMap = SHIKI_LANGUAGE_ALIASES;
const SHIKI_SPECIAL_LANGUAGES = new Set<ShikiLanguage>([
  "ansi",
  "text",
  SHIKI_FALLBACK_LANGUAGE,
]);

export type ShikiLanguageAlias = keyof typeof SHIKI_LANGUAGE_ALIASES;

export const normalizeShikiLanguage = (
  language: string | null | undefined
): string => {
  const normalized = language?.trim().toLowerCase() ?? "";

  if (!normalized) {
    return SHIKI_FALLBACK_LANGUAGE;
  }

  if (hasOwnProperty(normalized, SHIKI_LANGUAGE_ALIASES)) {
    return SHIKI_LANGUAGE_ALIASES[normalized as ShikiLanguageAlias];
  }

  return normalized;
};

export const resolveShikiLanguage = (
  language: string | null | undefined
): ShikiLanguage => {
  const normalizedLanguage = normalizeShikiLanguage(language);

  if (normalizedLanguage === SHIKI_FALLBACK_LANGUAGE) {
    return SHIKI_FALLBACK_LANGUAGE;
  }

  if (SHIKI_SPECIAL_LANGUAGES.has(normalizedLanguage as ShikiLanguage)) {
    return normalizedLanguage as ShikiLanguage;
  }

  if (
    hasOwnProperty(normalizedLanguage, bundledLanguages) ||
    hasOwnProperty(normalizedLanguage, bundledLanguagesAlias)
  ) {
    return normalizedLanguage as ShikiLanguage;
  }

  return SHIKI_FALLBACK_LANGUAGE;
};
