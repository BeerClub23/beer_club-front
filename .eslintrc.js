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
    'no-unused-vars': "off",
    semi: "off",
    'react-hooks/exhaustive-deps': "off",
    "no-useless-escape": "off",
    "jsx-a11y/label-has-associated-control":"off"
  },
  overrides: [
    {
      files: ['**/*.jsx', '**/*.js', '**/*.ts'], // Ajusta esto según tus necesidades
      rules: {
        'prettier/prettier': 'off', // Deshabilita Prettier
      },
    },
  ],
};

