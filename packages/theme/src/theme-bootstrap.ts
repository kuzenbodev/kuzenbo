export const THEME_COOKIE_KEY = "kuzenbo-theme";
export const THEME_STORAGE_KEY = "kuzenbo-theme";
export const THEME_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
export const SYSTEM_DARK_MEDIA_QUERY = "(prefers-color-scheme: dark)";
export const DEFAULT_THEME_SETTING = "system" as const;
export const THEME_BOOTSTRAP_SCRIPT_ID = "kuzenbo-theme-bootstrap";
export const THEME_BOOTSTRAP_NONCE_ENV_KEY = "THEME_BOOTSTRAP_NONCE";

export type ThemePreference = "dark" | "light";
export type ThemeSetting = ThemePreference | typeof DEFAULT_THEME_SETTING;

export interface ThemeBootstrapPlanInput {
  cookieTheme: ThemePreference | null;
  defaultThemeSetting?: ThemeSetting;
  storageTheme: ThemePreference | null;
  systemTheme: ThemePreference;
}

export interface ThemeBootstrapPlan {
  resolvedTheme: ThemePreference;
  shouldWriteCookie: boolean;
  shouldWriteStorage: boolean;
}

export interface ThemeBootstrapScriptOptions {
  defaultThemeSetting?: ThemeSetting;
}

export const parseThemePreference = (
  value: string | null | undefined
): ThemePreference | null => {
  if (value === "dark" || value === "light") {
    return value;
  }

  return null;
};

export const readThemeFromCookieString = (
  cookieString: string,
  key = THEME_COOKIE_KEY
): ThemePreference | null => {
  const cookiePairs = cookieString.split(";");

  for (const cookiePair of cookiePairs) {
    const [rawCookieKey, ...rawValueParts] = cookiePair.trim().split("=");

    if (!rawCookieKey || rawValueParts.length === 0 || rawCookieKey !== key) {
      continue;
    }

    const rawValue = rawValueParts.join("=");

    try {
      return parseThemePreference(decodeURIComponent(rawValue));
    } catch {
      return parseThemePreference(rawValue);
    }
  }

  return null;
};

export const serializeThemeCookie = (theme: ThemePreference): string =>
  `${THEME_COOKIE_KEY}=${theme}; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;

export const persistThemeCookie = (theme: ThemePreference): void => {
  if (typeof document === "undefined") {
    return;
  }

  Reflect.set(document, "cookie", serializeThemeCookie(theme));
};

export const applyThemeToRootElement = (theme: ThemePreference): void => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
};

export const resolveDefaultThemePreference = (
  systemTheme: ThemePreference,
  defaultThemeSetting: ThemeSetting = DEFAULT_THEME_SETTING
): ThemePreference =>
  defaultThemeSetting === "system" ? systemTheme : defaultThemeSetting;

export const getThemeBootstrapScriptNonce = (): string | undefined =>
  typeof process === "undefined"
    ? undefined
    : process.env[THEME_BOOTSTRAP_NONCE_ENV_KEY] || undefined;

export const resolveThemeBootstrapPlan = ({
  cookieTheme,
  defaultThemeSetting = DEFAULT_THEME_SETTING,
  storageTheme,
  systemTheme,
}: ThemeBootstrapPlanInput): ThemeBootstrapPlan => {
  if (cookieTheme) {
    return {
      resolvedTheme: cookieTheme,
      shouldWriteCookie: false,
      shouldWriteStorage: storageTheme !== cookieTheme,
    };
  }

  if (storageTheme) {
    return {
      resolvedTheme: storageTheme,
      shouldWriteCookie: true,
      shouldWriteStorage: false,
    };
  }

  return {
    resolvedTheme: resolveDefaultThemePreference(
      systemTheme,
      defaultThemeSetting
    ),
    shouldWriteCookie: false,
    shouldWriteStorage: false,
  };
};

export const getThemeBootstrapScript = ({
  defaultThemeSetting = DEFAULT_THEME_SETTING,
}: ThemeBootstrapScriptOptions = {}): string => `
(function () {
  var COOKIE_KEY = ${JSON.stringify(THEME_COOKIE_KEY)};
  var DEFAULT_THEME_SETTING = ${JSON.stringify(defaultThemeSetting)};
  var STORAGE_KEY = ${JSON.stringify(THEME_STORAGE_KEY)};
  var COOKIE_MAX_AGE_SECONDS = ${THEME_COOKIE_MAX_AGE_SECONDS};
  var SYSTEM_DARK_QUERY = ${JSON.stringify(SYSTEM_DARK_MEDIA_QUERY)};

  var parseTheme = function (value) {
    return value === "dark" || value === "light" ? value : null;
  };

  var getCookieTheme = function (cookieString, key) {
    var cookiePairs = cookieString.split(";");

    for (var index = 0; index < cookiePairs.length; index += 1) {
      var pair = cookiePairs[index].trim();
      if (!pair) continue;

      var separatorIndex = pair.indexOf("=");
      if (separatorIndex === -1) continue;

      var cookieKey = pair.slice(0, separatorIndex);
      if (cookieKey !== key) continue;

      var cookieValue = pair.slice(separatorIndex + 1);

      try {
        return parseTheme(decodeURIComponent(cookieValue));
      } catch (_error) {
        return parseTheme(cookieValue);
      }
    }

    return null;
  };

  var getSystemTheme = function () {
    return window.matchMedia(SYSTEM_DARK_QUERY).matches ? "dark" : "light";
  };

  var resolveDefaultTheme = function (systemTheme) {
    return DEFAULT_THEME_SETTING === "system" ? systemTheme : DEFAULT_THEME_SETTING;
  };

  var root = document.documentElement;

  try {
    var cookieTheme = getCookieTheme(document.cookie || "", COOKIE_KEY);
    var storageTheme = null;

    try {
      storageTheme = parseTheme(window.localStorage.getItem(STORAGE_KEY));
    } catch (_storageReadError) {}

    var storageCandidate = storageTheme;
    var systemTheme = getSystemTheme();
    var resolvedTheme = resolveDefaultTheme(systemTheme);
    var shouldWriteCookie = false;
    var shouldWriteStorage = false;

    if (cookieTheme) {
      resolvedTheme = cookieTheme;
      shouldWriteStorage = storageCandidate !== cookieTheme;
    } else if (storageCandidate) {
      resolvedTheme = storageCandidate;
      shouldWriteCookie = true;
    }

    root.classList.toggle("dark", resolvedTheme === "dark");
    root.style.colorScheme = resolvedTheme;

    if (shouldWriteStorage) {
      try {
        window.localStorage.setItem(STORAGE_KEY, resolvedTheme);
      } catch (_storageWriteError) {}
    }

    if (shouldWriteCookie) {
      document.cookie =
        COOKIE_KEY +
        "=" +
        resolvedTheme +
        "; Path=/; Max-Age=" +
        COOKIE_MAX_AGE_SECONDS +
        "; SameSite=Lax";
    }
  } catch (_error) {
    var fallbackTheme = getSystemTheme();
    root.classList.toggle("dark", fallbackTheme === "dark");
    root.style.colorScheme = fallbackTheme;
  }
})();
`;
