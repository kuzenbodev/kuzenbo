import { describe, expect, it } from "bun:test";
import { runInNewContext } from "node:vm";

import {
  DEFAULT_THEME_SETTING,
  getThemeBootstrapScript,
  parseThemePreference,
  readThemeFromCookieString,
  resolveDefaultThemePreference,
  resolveThemeBootstrapPlan,
  serializeThemeCookie,
  THEME_COOKIE_KEY,
  THEME_COOKIE_MAX_AGE_SECONDS,
  THEME_STORAGE_KEY,
} from "./theme-bootstrap";

interface ExecuteThemeBootstrapScriptOptions {
  cookie?: string;
  prefersDark?: boolean;
  shouldThrowOnStorageRead?: boolean;
  shouldThrowOnStorageWrite?: boolean;
}

const executeThemeBootstrapScript = ({
  cookie = "",
  prefersDark = false,
  shouldThrowOnStorageRead = false,
  shouldThrowOnStorageWrite = false,
}: ExecuteThemeBootstrapScriptOptions = {}) => {
  const script = getThemeBootstrapScript();
  const classList = new Set<string>();
  const style = {
    colorScheme: "",
  };
  let documentCookie = cookie;

  const rootElement = {
    classList: {
      toggle: (token: string, force = false) => {
        if (force) {
          classList.add(token);
          return;
        }

        classList.delete(token);
      },
    },
    style,
  };

  const documentMock = {
    get cookie() {
      return documentCookie;
    },
    set cookie(value: string) {
      documentCookie = value;
    },
    documentElement: rootElement,
  };

  const windowMock = {
    localStorage: {
      getItem: () => {
        if (shouldThrowOnStorageRead) {
          throw new Error("storage read failed");
        }

        return null;
      },
      setItem: () => {
        if (shouldThrowOnStorageWrite) {
          throw new Error("storage write failed");
        }
      },
    },
    matchMedia: () => ({ matches: prefersDark }),
  };

  runInNewContext(script, {
    document: documentMock,
    window: windowMock,
  });

  return {
    classList,
    colorScheme: style.colorScheme,
    cookie: documentCookie,
  };
};

describe("theme bootstrap parsing", () => {
  it("accepts only dark and light values", () => {
    expect(parseThemePreference("dark")).toBe("dark");
    expect(parseThemePreference("light")).toBe("light");
    expect(parseThemePreference("system")).toBeNull();
    expect(parseThemePreference("")).toBeNull();
    expect(parseThemePreference(null)).toBeNull();
  });

  it("reads a valid theme from cookie string", () => {
    const cookieString =
      "session=abc123; kuzenbo-theme=dark; __Secure-flag=enabled";

    expect(readThemeFromCookieString(cookieString)).toBe("dark");
  });

  it("ignores invalid cookie values", () => {
    const cookieString = "kuzenbo-theme=system";

    expect(readThemeFromCookieString(cookieString)).toBeNull();
  });
});

describe("theme bootstrap planning", () => {
  it("prioritizes cookie over local storage and syncs storage when mismatched", () => {
    const plan = resolveThemeBootstrapPlan({
      cookieTheme: "dark",
      storageTheme: "light",
      systemTheme: "light",
    });

    expect(plan).toEqual({
      resolvedTheme: "dark",
      shouldWriteCookie: false,
      shouldWriteStorage: true,
    });
  });

  it("uses local storage and writes cookie when cookie is missing", () => {
    const plan = resolveThemeBootstrapPlan({
      cookieTheme: null,
      storageTheme: "dark",
      systemTheme: "light",
    });

    expect(plan).toEqual({
      resolvedTheme: "dark",
      shouldWriteCookie: true,
      shouldWriteStorage: false,
    });
  });

  it("falls back to system theme with no persistence writes", () => {
    const plan = resolveThemeBootstrapPlan({
      cookieTheme: null,
      storageTheme: null,
      systemTheme: "dark",
    });

    expect(plan).toEqual({
      resolvedTheme: "dark",
      shouldWriteCookie: false,
      shouldWriteStorage: false,
    });
  });

  it("supports explicit default theme fallback", () => {
    const plan = resolveThemeBootstrapPlan({
      cookieTheme: null,
      defaultThemeSetting: "light",
      storageTheme: null,
      systemTheme: "dark",
    });

    expect(plan).toEqual({
      resolvedTheme: "light",
      shouldWriteCookie: false,
      shouldWriteStorage: false,
    });
  });
});

describe("default theme setting", () => {
  it("uses system fallback by default", () => {
    expect(DEFAULT_THEME_SETTING).toBe("system");
    expect(resolveDefaultThemePreference("dark")).toBe("dark");
    expect(resolveDefaultThemePreference("light")).toBe("light");
  });
});

describe("theme bootstrap serialization", () => {
  it("serializes a one-year cookie", () => {
    expect(serializeThemeCookie("light")).toBe(
      `${THEME_COOKIE_KEY}=light; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`
    );
  });

  it("embeds expected keys in bootstrap script", () => {
    const script = getThemeBootstrapScript();

    expect(script).toContain(DEFAULT_THEME_SETTING);
    expect(script).toContain(THEME_COOKIE_KEY);
    expect(script).toContain(THEME_STORAGE_KEY);
  });

  it("supports overriding default theme fallback in script output", () => {
    const script = getThemeBootstrapScript({ defaultThemeSetting: "light" });

    expect(script).toContain('var DEFAULT_THEME_SETTING = "light";');
  });

  it("honors cookie preference when localStorage access throws", () => {
    const result = executeThemeBootstrapScript({
      cookie: `${THEME_COOKIE_KEY}=dark`,
      prefersDark: false,
      shouldThrowOnStorageRead: true,
      shouldThrowOnStorageWrite: true,
    });

    expect(result.colorScheme).toBe("dark");
    expect(result.classList.has("dark")).toBe(true);
  });
});
