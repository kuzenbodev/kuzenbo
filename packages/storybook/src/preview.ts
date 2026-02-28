import {
  DecoratorHelpers,
  withThemeByClassName,
} from "@storybook/addon-themes";
import type { Decorator, Preview } from "@storybook/react-vite";

const { pluckThemeFromContext } = DecoratorHelpers;

const withKuzenboColorScheme: Decorator = (Story, context) => {
  const selectedTheme = pluckThemeFromContext(context);
  const themeName = selectedTheme === "dark" ? "dark" : "light";

  document.documentElement.style.colorScheme = themeName;
  document.documentElement.dataset.kbTheme = themeName;

  return Story();
};

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      defaultTheme: "light",
      parentSelector: "html",
      themes: {
        dark: "dark",
        light: "",
      },
    }),
    withKuzenboColorScheme,
  ],
  parameters: {
    a11y: {
      test: "todo",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      autodocs: "tag",
    },
  },
};

export default preview;
