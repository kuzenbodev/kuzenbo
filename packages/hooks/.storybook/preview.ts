import sharedPreview from "@kuzenbo/storybook/preview";

// @ts-expect-error -- Storybook resolves side-effect CSS imports via Vite.
import "./preview.css";

export default sharedPreview;
