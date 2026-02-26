import mdx from "@mdx-js/rollup";
import { nitro } from "nitro/vite";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import vinext from "vinext";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "next/link",
      "next/navigation",
      "next-themes",
      "@base-ui/react/button",
      "@base-ui/react/collapsible",
      "@base-ui/react/drawer",
      "@base-ui/react/input",
      "@base-ui/react/merge-props",
      "@base-ui/react/separator",
      "@base-ui/react/tabs",
      "@base-ui/react/tooltip",
      "@base-ui/react/use-render",
      "@hugeicons/core-free-icons",
      "@hugeicons/react",
      "tailwind-variants",
    ],
  },
  plugins: [
    mdx({
      remarkPlugins: [remarkDirective, remarkFrontmatter],
    }),
    vinext(),
    command === "build" ? nitro() : undefined,
  ].filter(Boolean),
}));
