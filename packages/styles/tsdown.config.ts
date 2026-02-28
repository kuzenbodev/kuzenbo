import { defineConfig } from "tsdown";

export default defineConfig({
  clean: true,
  entry: ["src/recommended.css"],
  format: ["esm"],
  platform: "neutral",
});
