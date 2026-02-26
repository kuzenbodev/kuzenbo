import mdx from "@mdx-js/rollup";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import vinext from "vinext";
import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },
  plugins: [
    mdx({
      remarkPlugins: [remarkDirective, remarkFrontmatter],
    }),
    vinext(),
  ],
});
