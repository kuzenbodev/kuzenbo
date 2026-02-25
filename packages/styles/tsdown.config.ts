import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/recommended.css"],
  format: ["esm"],
  clean: true,
  platform: "neutral",
});
