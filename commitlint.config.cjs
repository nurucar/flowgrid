/**
 * Conventional commits — allowed types:
 *   feat     → new feature
 *   fix      → bug fix
 *   chore    → tooling / config (Husky, ESLint, Vite, etc.)
 *   refactor → code improvement with no behavior change
 *   docs     → documentation (README, comments, etc.)
 *   test     → add or fix tests
 *   style    → formatting only (Prettier, whitespace, punctuation; no logic)
 *
 * @see https://www.conventionalcommits.org/
 * @type {import('@commitlint/types').UserConfig}
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "chore", "refactor", "docs", "test", "style"],
    ],
  },
  ignores: [
    (message) => message.trimStart().startsWith("Merge "),
  ],
};
