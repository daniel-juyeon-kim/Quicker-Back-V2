import pluginJs from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{ts}"] },
  { languageOptions: { globals: globals.browser } },
  eslintConfigPrettier,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "constructor-super": "warn",
      "for-direction": "warn",
      "getter-return": "warn",
      "no-async-promise-executor": "warn",
      "no-class-assign": "warn",
      "no-compare-neg-zero": "warn",
      "no-cond-assign": "warn",
      "no-dupe-else-if": "warn",
      "no-unreachable": "warn",
      "no-unsafe-optional-chaining": "warn",
      "no-unsafe-negation": "warn",
      "no-unused-private-class-members": "warn",
      "use-isnan": "warn",
      "valid-typeof": "warn",
      "no-empty-static-block": "warn",
      "padding-line-between-statements": [
        "warn",
        { blankLine: "always", prev: "multiline-block-like", next: "const" },
        { blankLine: "always", prev: "const", next: "multiline-block-like" },
        { blankLine: "always", prev: "multiline-block-like", next: "multiline-block-like" },

        { blankLine: "always", prev: "class", next: "multiline-block-like" },
        { blankLine: "always", prev: "multiline-block-like", next: "class" },
        { blankLine: "always", prev: "class", next: "class" },

        { blankLine: "always", prev: "class", next: "const" },
        { blankLine: "always", prev: "const", next: "class" },

        { blankLine: "always", prev: "class", next: "multiline-block-like" },
        { blankLine: "always", prev: "multiline-block-like", next: "class" },
        { blankLine: "always", prev: "class", next: "class" },
      ],
      "lines-between-class-members": [
        "warn",
        {
          enforce: [
            { blankLine: "always", prev: "method", next: "method" },
            { blankLine: "always", prev: "method", next: "field" },
            { blankLine: "always", prev: "field", next: "method" },
          ],
        },
        { exceptAfterSingleLine: false },
      ],
    },
    ignores: ["**/node_modules/", "**/tsconfig.json"],
  },
];
