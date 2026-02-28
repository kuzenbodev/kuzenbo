const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Keep conventional commits strict while allowing longer AI-assisted summaries.
    "body-max-line-length": [0, "always", 0],
    "footer-max-line-length": [0, "always", 0],
    "header-max-length": [2, "always", 200],
  },
};

export default config;
