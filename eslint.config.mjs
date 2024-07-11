import pluginJs from "@eslint/js";
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
    },
    ignores: ["**/node_modules/", "**/tsconfig.json"],
  },
];
