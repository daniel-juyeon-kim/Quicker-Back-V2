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
      "@typescript-eslint/no-unused-vars": "error",
      "constructor-super": "error",
      "for-direction": "error",
      "getter-return": "error",
      "no-async-promise-executor": "error",
      "no-class-assign": "error",
      "no-compare-neg-zero": "error",
      "no-cond-assign": "error",
      "no-dupe-else-if": "error",
      "no-unreachable": "error",
      "no-unsafe-optional-chaining": "error",
      "no-unsafe-negation": "error",
      "no-unused-private-class-members": "error",
      "use-isnan": "error",
      "valid-typeof": "error",
      "no-empty-static-block": "error",
      "padding-line-between-statements": [
        "error",
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
        "error",
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
