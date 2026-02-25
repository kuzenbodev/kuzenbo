import {
  DEFAULT_THEME_SETTING,
  getThemeBootstrapScript,
  getThemeBootstrapScriptNonce,
  THEME_BOOTSTRAP_SCRIPT_ID,
  type ThemeSetting,
} from "./theme-bootstrap";

export interface ThemeBootstrapScriptProps {
  defaultThemeSetting?: ThemeSetting;
  id?: string;
  nonce?: string;
}

export const ThemeBootstrapScript = ({
  defaultThemeSetting = DEFAULT_THEME_SETTING,
  id = THEME_BOOTSTRAP_SCRIPT_ID,
  nonce = getThemeBootstrapScriptNonce(),
}: ThemeBootstrapScriptProps) => (
  <script
    dangerouslySetInnerHTML={{
      __html: getThemeBootstrapScript({ defaultThemeSetting }),
    }}
    id={id}
    nonce={nonce}
  />
);
