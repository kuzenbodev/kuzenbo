export {
  DEFAULT_THEME_SETTING,
  LEGACY_THEME_STORAGE_KEY,
  SYSTEM_DARK_MEDIA_QUERY,
  THEME_BOOTSTRAP_NONCE_ENV_KEY,
  THEME_BOOTSTRAP_SCRIPT_ID,
  THEME_COOKIE_KEY,
  THEME_COOKIE_MAX_AGE_SECONDS,
  THEME_STORAGE_KEY,
  applyThemeToRootElement,
  getThemeBootstrapScript,
  getThemeBootstrapScriptNonce,
  parseThemePreference,
  persistThemeCookie,
  readThemeFromCookieString,
  resolveDefaultThemePreference,
  resolveThemeBootstrapPlan,
  serializeThemeCookie,
} from "./theme-bootstrap";
export { ThemeBootstrapScript } from "./theme-bootstrap-script";
export { ThemeProvider } from "./theme-provider";
export type { ThemeProviderProps } from "./theme-provider";
export type {
  ThemeBootstrapPlan,
  ThemeBootstrapPlanInput,
  ThemeBootstrapScriptOptions,
  ThemePreference,
  ThemeSetting,
} from "./theme-bootstrap";
