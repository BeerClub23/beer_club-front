module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "next",
    "next/core-web-vitals",
  ],
  rules: {
    semi: ["error", "always"],
    "no-unused-vars": "off",
    "no-useless-escape": "off",
    "jsx-a11y/label-has-associated-control": "off"
  },
};
