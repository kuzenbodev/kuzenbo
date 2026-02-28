# Theme Runtime API (Stable 0.0.6)

## Public imports

- Root runtime: `@kuzenbo/theme`
- Provider-only path: `@kuzenbo/theme/theme-provider`
- Base stylesheet: `@kuzenbo/theme/default.css`
- Prebuilt stylesheets: `@kuzenbo/theme/prebuilt/<name>.css`

## Runtime components

- `ThemeProvider`
- `ThemeBootstrapScript`

## Bootstrap helpers and constants

- `resolveThemeBootstrapPlan`
- `getThemeBootstrapScript`
- `getThemeBootstrapScriptNonce`
- `applyThemeToRootElement`
- `parseThemePreference`
- `resolveDefaultThemePreference`
- `readThemeFromCookieString`
- `serializeThemeCookie`
- `persistThemeCookie`
- `THEME_COOKIE_KEY`
- `THEME_STORAGE_KEY`
- `THEME_COOKIE_MAX_AGE_SECONDS`
- `SYSTEM_DARK_MEDIA_QUERY`
- `DEFAULT_THEME_SETTING`
- `THEME_BOOTSTRAP_SCRIPT_ID`
- `THEME_BOOTSTRAP_NONCE_ENV_KEY`

## Exported types

- `ThemeProviderProps`
- `ThemePreference`
- `ThemeSetting`
- `ThemeBootstrapPlan`
- `ThemeBootstrapPlanInput`
- `ThemeBootstrapScriptOptions`
