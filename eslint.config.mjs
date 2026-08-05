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
  },
);
