import { describe, expect, it } from "bun:test";

import {
  SHIKI_FALLBACK_LANGUAGE,
  normalizeShikiLanguage,
  resolveShikiLanguage,
  shikiLanguageAliasMap,
} from "../shiki/shiki-language-map";

describe("shiki language map", () => {
  it("maps npm/shell aliases to bash", () => {
    expect(normalizeShikiLanguage("npm")).toBe(shikiLanguageAliasMap.npm);
    expect(normalizeShikiLanguage("sh")).toBe(shikiLanguageAliasMap.sh);
    expect(normalizeShikiLanguage("shell")).toBe(shikiLanguageAliasMap.shell);
    expect(normalizeShikiLanguage("zsh")).toBe(shikiLanguageAliasMap.zsh);
    expect(resolveShikiLanguage("npm")).toBe("bash");
  });

  it("keeps known shiki languages", () => {
    expect(resolveShikiLanguage("ts")).toBe("ts");
    expect(resolveShikiLanguage("typescript")).toBe("typescript");
  });

  it("keeps special shiki languages", () => {
    expect(resolveShikiLanguage("ansi")).toBe("ansi");
    expect(resolveShikiLanguage("text")).toBe("text");
    expect(resolveShikiLanguage("plaintext")).toBe("plaintext");
  });

  it("falls back to plaintext for unknown or empty language", () => {
    expect(resolveShikiLanguage("unknown-language")).toBe(
      SHIKI_FALLBACK_LANGUAGE
    );
    expect(resolveShikiLanguage("")).toBe(SHIKI_FALLBACK_LANGUAGE);
    expect(resolveShikiLanguage(null)).toBe(SHIKI_FALLBACK_LANGUAGE);
  });
});
