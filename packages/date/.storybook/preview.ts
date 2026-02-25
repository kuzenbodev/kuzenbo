import type { Decorator, Preview } from "@storybook/react-vite";

import { KuzenboProvider } from "@kuzenbo/core/provider";
import sharedPreview from "@kuzenbo/storybook/preview";
import { ThemeProvider } from "@kuzenbo/theme";
import { createElement } from "react";

import "./preview.css";

const withKuzenboProviders: Decorator = (Story) =>
  createElement(
    ThemeProvider,
    undefined,
    createElement(KuzenboProvider, undefined, createElement(Story))
  );

const sharedDecorators: Decorator[] = [];

if (Array.isArray(sharedPreview.decorators)) {
  sharedDecorators.push(...sharedPreview.decorators);
} else if (sharedPreview.decorators) {
  sharedDecorators.push(sharedPreview.decorators);
}

const preview: Preview = {
  ...sharedPreview,
  decorators: [...sharedDecorators, withKuzenboProviders],
};

export default preview;
