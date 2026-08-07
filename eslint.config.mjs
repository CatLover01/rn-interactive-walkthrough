import { defineConfig, globalIgnores } from "eslint/config";
import { recommended, react, typechecked } from "eslint-config-satya164";

export default defineConfig(
  [globalIgnores(["lib/", "docs/"])],
  recommended,
  react,
  typechecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            ["internal", "parent", "sibling", "index"],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },
);
