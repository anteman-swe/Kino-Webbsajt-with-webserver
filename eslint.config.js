import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals"; // <--- Importera detta!

export default tseslint.config(
  {
    ignores: ["dist", "build", "node_modules", "temp"],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
    },
    languageOptions: {
      // Här talar vi om att "window", "document" etc finns!
      globals: {
        ...globals.browser,
        ...globals.node, // Lägg till denna om du även kör kod i Node.js
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    // ... resten av din konfiguration (settings, rules etc)
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
);
