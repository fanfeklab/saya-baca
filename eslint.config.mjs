import { defineConfig } from "eslint/config";
import next from "eslint-config-next";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  {
    plugins: {
      import: importPlugin
    },
    rules: {
      "import/no-cycle": "error"
    }
  },
  ...next
]);
