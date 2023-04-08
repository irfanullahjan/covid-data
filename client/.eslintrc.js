/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  plugins: ["import", "prettier"],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  rules: {
    "prettier/prettier": "error",
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc", caseInsensitive: true },
        warnOnUnassignedImports: true,
        pathGroups: [
          {
            pattern: "~/**",
            group: "external",
          },
        ],
      },
    ],
    "import/no-unassigned-import": "error",
  },
};
