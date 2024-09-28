module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: "./tsconfig.eslint.json",
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
 
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": [
      "error", 
      {
        "fixToUnknown": true, 
        "ignoreRestArgs": false
      }
    ],
    "prettier/prettier": "error",
    'jsx-a11y/no-static-element-interactions': 'off', //no-static-element-interactions
    'jsx-a11y/click-events-have-key-events': 'off', //click-events-have-key-events
    "linebreak-style": ["error", "unix"],
    "import/prefer-default-export": "off",
    "react/require-default-props": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/no-array-index-key": "off",
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    "no-console": "off", // Disable the no-console rule
    "jsx-a11y/no-noninteractive-element-to-interactive-role": "off",
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["state"],
      },
    ],
    "no-use-before-define": "off", // Disable the base rule
    // Add this rule to allow variable usage before definition
    "@typescript-eslint/no-use-before-define": [
      "error",
      { "functions": false, "classes": false, "variables": false }
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      // Override for JavaScript files
      files: ['*.js', '*.jsx'],
      parser: 'espree', // Use the default JavaScript parser for JS files
      parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
      },
    },
  ],
};
