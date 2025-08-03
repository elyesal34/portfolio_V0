import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/self-closing-comp': 'off',
       // Règles de base React
    "react/react-in-jsx-scope": "off", // Pas nécessaire depuis React 17+
    "react/jsx-uses-react": "off",     // Idem
    
    // Règles de style JSX
    "react/self-closing-comp": ["error", {
      "component": true,
      "html": false // Désactive l'exigence de / pour les balises HTML natives
    }],
    
    // Règles de qualité de code
    "react/jsx-no-useless-fragment": ["error", {
      "allowExpressions": true
    }],
    "react/jsx-no-comment-textnodes": "warn",
    "react/jsx-no-duplicate-props": "error",
    "react/jsx-no-target-blank": ["error", { 
      "enforceDynamicLinks": "always" 
    }],
    "react/jsx-no-undef": "error",
    
    // Règles Hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    
    // Règles personnalisées
    "react-refresh/only-export-components": [
      "warn",
      { "allowConstantExport": true }
    ]
    },
  }
);
