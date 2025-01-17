const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const rnx = require("@rnx-kit/eslint-plugin");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    plugins: {
      wdio: require("eslint-plugin-wdio"),
    },
  },
  ...compat.extends(
    "plugin:@microsoft/sdl/required",
    "plugin:wdio/recommended"
  ),
  ...rnx.configs.strict,
  {
    ignores: ["!.yarn"],
    plugins: {
      local: require("./scripts/eslint/plugin"),
    },
    rules: {
      "local/no-process-exit": "error",
      "no-restricted-exports": [
        "error",
        {
          restrictDefaultExports: {
            direct: true,
            named: true,
            defaultFrom: true,
            namedFrom: true,
            namespaceFrom: true,
          },
        },
      ],
    },
  },
];
