import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import a11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Local plugin to forbid anchors like href="#..." or to="#..."
const navPlugin = {
  rules: {
    'no-hash-anchors': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Disallow JSX href/to starting with "#". Use "/#..." instead.',
          recommended: false,
        },
        fixable: 'code',
        schema: [],
        messages: {
          useSlash: 'Use "/#..." instead of "#..." for anchors to ensure correct routing.',
        },
      },
      create(context) {
        function getLiteralValue(attr) {
          const v = attr.value;
          if (!v) return null;
          // <a href="#id"> or <HashLink to="#id">
          if (v.type === 'Literal' && typeof v.value === 'string') return v;
          // <a href={"#id"}>
          if (
            v.type === 'JSXExpressionContainer' &&
            v.expression &&
            v.expression.type === 'Literal' &&
            typeof v.expression.value === 'string'
          ) {
            return v.expression;
          }
          return null;
        }

        return {
          JSXAttribute(node) {
            try {
              if (!node.name || (node.name.name !== 'href' && node.name.name !== 'to')) return;
              const lit = getLiteralValue(node);
              if (!lit) return;
              const str = lit.value;
              if (typeof str === 'string' && str.startsWith('#')) {
                context.report({
                  node: lit,
                  messageId: 'useSlash',
                  fix(fixer) {
                    const source = context.getSourceCode().getText(lit);
                    // Replace only the leading # with /# keeping quotes as-is
                    const fixed = source.replace(/[#]/, '/#');
                    return fixer.replaceText(lit, fixed);
                  },
                });
              }
            } catch {
              // best-effort; do not crash linting
            }
          },
        };
      },
    },
  },
};

const commonConfig = {
  ignores: [
    'dist', 
    'build', 
    'node_modules', 
    '**/*.d.ts', 
    '**/*.config.js',
    '**/*.config.ts',
    'public',
    'netlify',
    'dev-dist',
    // Ignore test and utility files with console statements
    'test-*.js',
    'test-*.ts',
    '**/test-*/**',
    '**/test/**',
    '**/tests/**',
    '**/__tests__/**',
    '**/*.test.js',
    '**/*.test.ts',
    '**/*.test.jsx',
    '**/*.test.tsx',
    '**/*.spec.js',
    '**/*.spec.ts',
    '**/scripts/**',
    '**/test-utils/**',
    'runtime-init.js',
    'vite-custom-client.js',
    'test-server.js',
    'test-node.js',
    'test-navigation.js',
    'test-output.txt',
    'vite-output.txt'
  ],
};

const typescriptConfig = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node,
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    react,
    import: importPlugin,
    'jsx-a11y': a11y,
    nav: navPlugin,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    // Imports
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          {
            pattern: '*.module.css',
            group: 'index',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'import/no-unresolved': 'off', // TS handles unresolved modules
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // React rules
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/self-closing-comp': ['error', { component: true, html: false }],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-no-comment-textnodes': 'warn',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
    'react/jsx-no-undef': 'error',
    'react/jsx-key': 'warn',
    'react/prop-types': 'off',
    // Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // TS rules
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    // Custom rules
    'nav/no-hash-anchors': 'error',
    // General rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'off',
  },
};

const javascriptConfig = {
  files: ['**/*.{js,jsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node,
    },
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    react,
    import: importPlugin,
    'jsx-a11y': a11y,
    nav: navPlugin,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    // Imports
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          {
            pattern: '*.module.css',
            group: 'index',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // React rules
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react/self-closing-comp': ['error', { component: true, html: false }],
    'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
    'react/jsx-no-comment-textnodes': 'warn',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-target-blank': ['error', { enforceDynamicLinks: 'always' }],
    'react/jsx-no-undef': 'error',
    'react/jsx-key': 'warn',
    // Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    // Custom rules
    'nav/no-hash-anchors': 'error',
    // General rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'warn',
  },
};

export default tseslint.config(
  commonConfig,
  {
    ...typescriptConfig,
    extends: [...tseslint.configs.recommended],
  },
  {
    ...javascriptConfig,
    extends: [js.configs.recommended],
  }
);
