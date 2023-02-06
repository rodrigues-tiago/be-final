/**
 * rules:
 * @see configuring https://eslint.org/docs/user-guide/configuring
 * @see js-rules https://eslint.org/docs/rules/
 * @see ts-rules https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
 *
 * extended configs:
 * @see recommended-requiring-type-checking https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/README.md
 * @sse prettier-rules https://prettier.io/docs/en/options.html
 *
 * refer to this documentation if time to lint becomes a problem:
 * @see typed-linting https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['!src/**/*.ts'],
  rules: {
    // _new:Possible Errors_
    'no-unreachable-loop': ['error'],
    'no-unsafe-optional-chaining': ['error'],
    'require-atomic-updates': ['error'],
    'no-loss-of-precision': ['error'],

    // _new:Best Practices_
    'class-methods-use-this': ['error'],
    'complexity': ['warn', {max: 10}],
    // 'curly': ['error', 'multi-line'], // probably redundant with nonblock-statement-body-position
    'default-case-last': ['error'],
    'dot-location': ['error', 'property'],
    'no-eval': ['error'],
    'no-labels': ['error'],
    'no-lone-blocks': ['error'],
    'no-loop-func': ['off'], // handled by @typescript-eslint/no-loop-func
    'no-multi-str': ['error'],
    'no-new': ['error'],
    'no-new-wrappers': ['error'], // complementary to @typescript-eslint/ban-types
    'no-param-reassign': ['error',  {props: true}],
    // 'no-restricted-properties': ['error', {object: '_', property: 'map'}],
    'no-return-assign': ['error'],
    'no-return-await': ['off'], // handled by @typescript-eslint/return-await
    'no-sequences': ['error'],
    'no-unused-expressions': ['off'], // handled by @typescript-eslint/no-unused-expressions
    'no-warning-comments': ['warn'],
    'prefer-promise-reject-errors': ['error'],
    'prefer-regex-literals': ['error'],
    'radix': ['error'],
    'require-await': 'error',
    'require-unicode-regexp': ['error'],
    'yoda': ['error'],

    // _new:Strict Mode_
    'strict': ['error'],

    // _new:Variables_
    'no-undef': 'off', // tsc handles this

    // _new:Stylistic Issues_
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'always'],
    'brace-style': ['off'], // handled by @typescript-eslint/brace-style
    'camelcase': ['off'], // unnecessary because of @typescript-eslint/naming-convention
    'comma-dangle': ['off'], // handled by @typescript-eslint/comma-dangle
    'comma-spacing': ['off'], // handled by @typescript-eslint/comma-spacing
    'comma-spacing': ['error'],
    'comma-style': ['error'],
    'computed-property-spacing': ['error', 'never'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['off'], // handled by @typescript-eslint/func-call-spacing
    'func-names': ['error', 'as-needed'],
    'id-length': ['warn', {min: 1, max: 25}],
    'indent': ['error', 2, {SwitchCase: 1}],
    'key-spacing': ['warn', {mode: 'minimum'}],
    'keyword-spacing': ['off'], // handled by @typescript-eslint/keyword-spacing
    'linebreak-style': ['error', 'unix'], // _prettier_
    'max-depth': ['warn'],
    'max-len': ['warn', {code: 100, ignoreComments: true}], // _prettier_
    'max-lines': ['warn', {"max": 300}],
    'max-lines-per-function': ['warn'],
    'max-nested-callbacks': ['warn', 5],
    'max-params': ['warn', 5],
    'max-statements-per-line': ['warn', {max: 3}],
    'multiline-ternary': ['error', 'always-multiline'],
    'new-parens': ['error', 'never'],
    'no-array-constructor': ['off'], // handled by @typescript-eslint/no-array-constructor
    'no-bitwise': ['warn'],
    'no-lonely-if': ['warn'],
    'no-mixed-spaces-and-tabs': ['off'], // unnecessary because of no-tabs
    'no-multi-assign': ['error'],
    'no-multi-spaces': ['error', { 'ignoreEOLComments': true }],
    'no-multiple-empty-lines': ['warn'],
    'no-negated-condition': ['error'],
    'no-nested-ternary': ['error'],
    'no-new-object': ['error'],
    'no-shadow': 'off', // checked by @typescript-eslint/no-shadow
    'no-tabs': ['error'],
    'no-trailing-spaces': ['error'],
    'no-unneeded-ternary': ['error', {defaultAssignment: false}],
    'no-unused-vars': ['off'], // handled by @typescript-eslint/no-unused-vars
    'no-whitespace-before-property': ['error'],
    'nonblock-statement-body-position': ['error', 'beside'],
    'object-curly-spacing': ['off'], // handled by @typescript-eslint/object-curly-spacing
    'one-var': ['error', 'never'],
    'operator-linebreak': ['error'],
    'padded-blocks': ['off'], // better handled by 'padding-line-between-statements'
    'padding-line-between-statements': ['off'], // better handled by @typescript-eslint/padding-line-between-statements
    'prefer-exponentiation-operator': ['warn'],
    'prefer-object-spread': ['error'],
    'quote-props': ['error', 'as-needed', {numbers: true}],
    'quotes': ['off'], // handled by @typescript-eslint/quotes
    'semi': ['off'], // handled by @typescript-eslint/semi
    'semi-spacing': ['error'],
    'semi-style': ['error', 'first'],
    'space-before-blocks': ['error'],
    'space-before-function-paren': ['off'], // handled by @typescript-eslint/space-before-function-paren
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['off'], // handled by @typescript-eslint/space-infix-ops
    'space-unary-ops': ['error'],
    'spaced-comment': ['warn'],
    'switch-colon-spacing': ['error'],
    'template-tag-spacing': ['error'],
    'unicode-bom': ['error', 'never'],

    // _new:ECMAScript 6_
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'], // _prettier_
    'arrow-spacing': ['error'],
    'generator-star-spacing': ['error', {before: false, after: true, method: {before: true, after: false}}],
    'no-confusing-arrow': ['off'],
    'no-duplicate-imports': ['off'], // handled by @typescript-eslint/no-dupe-class-members
    'no-new-symbol': ['off'], // handled by tsc
    'no-this-before-super': ['off'], // handled by tsc
    'no-useless-computed-key': ['error', {enforceForClassMembers: true}],
    'no-useless-rename': ['error'],
    'no-var': ['error'],
    'prefer-const': ['error', { 'destructuring': 'all' }],
    'prefer-destructuring': ['error'],
    'prefer-numeric-literals': ['error'],
    'prefer-rest-params': ['error'],
    'prefer-spread': ['error'],
    'prefer-template': ['error'],
    'rest-spread-spacing': ['error'],
    'template-curly-spacing': ['error'],
    'yield-star-spacing': ['error'],


    // _typescript:Supported Rules_
    '@typescript-eslint/class-literal-property-style': ['warn', 'fields'],
    '@typescript-eslint/consistent-indexed-object-style': ['warn', 'record'],
    '@typescript-eslint/consistent-type-assertions': ['error', {assertionStyle: 'as'}],
    '@typescript-eslint/consistent-type-definitions': ['off'],
    '@typescript-eslint/explicit-member-accessibility': ['warn', {accessibility: 'no-public'}],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {delimiter: 'none'},
      singleline: {delimiter: 'semi'},
    }],
    '@typescript-eslint/naming-convention': [
      'error',
      {selector: 'default', format: ['camelCase'], leadingUnderscore: 'forbid', trailingUnderscore: 'forbid'},
      {selector: 'typeLike', format: ['PascalCase'], leadingUnderscore: 'forbid', trailingUnderscore: 'forbid'},
      {selector: 'variable', modifiers: ['const'], format: ['camelCase', 'UPPER_CASE'], leadingUnderscore: 'forbid', trailingUnderscore: 'forbid'},
      {selector: 'variable', modifiers: ['unused'], format: ['camelCase'], leadingUnderscore: 'allow', trailingUnderscore: 'forbid'},
      {selector: 'parameter', modifiers: ['unused'], format: ['camelCase'], leadingUnderscore: 'allow', trailingUnderscore: 'forbid'},
      {selector: 'objectLiteralProperty', format: null}, // allows literal objects to comply with 3rd party APIs
    ],
    '@typescript-eslint/no-confusing-non-null-assertion': ['error'],
    '@typescript-eslint/no-dynamic-delete': ['error'],
    '@typescript-eslint/no-empty-interface': ['warn'],
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/no-extra-non-null-assertion': ['error'],
    '@typescript-eslint/no-extraneous-class': ['warn'],
    '@typescript-eslint/no-implicit-any-catch': ['error'],
    '@typescript-eslint/no-namespace': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['error'],
    '@typescript-eslint/no-require-imports': ['error'],
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],
    '@typescript-eslint/no-unnecessary-type-constraint': ['error'],
    '@typescript-eslint/no-unsafe-argument': ['error'],
    '@typescript-eslint/prefer-enum-initializers': ['warn'],
    '@typescript-eslint/prefer-for-of': ['warn'],
    '@typescript-eslint/prefer-function-type': ['warn'],
    '@typescript-eslint/prefer-includes': ['warn'],
    '@typescript-eslint/prefer-optional-chain': ['warn'],
    '@typescript-eslint/prefer-string-starts-ends-with': ['warn'],
    '@typescript-eslint/require-array-sort-compare': ['error'],
    "@typescript-eslint/require-await": "off", // overrides plugin:@typescript-eslint/recommended - handled by `require-await`
    '@typescript-eslint/restrict-template-expressions': ['warn', {allowNumber: true, allowBoolean: true}],
    '@typescript-eslint/switch-exhaustiveness-check': ['error'],
    '@typescript-eslint/type-annotation-spacing': ['error'],

    // __typescript:Extension Rules_
    '@typescript-eslint/brace-style': ['error', '1tbs', {allowSingleLine: true}],
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'], // _prettier_
    '@typescript-eslint/comma-spacing': ['error'],
    '@typescript-eslint/func-call-spacing': ['error', 'never'],
    '@typescript-eslint/keyword-spacing': ['error'],
    // Allows constant schemas to have same name as their inferred types
    '@typescript-eslint/naming-convention': [
      'error',
      {selector: 'default', format: ['camelCase'], leadingUnderscore: 'forbid', trailingUnderscore: 'forbid'},
      {selector: 'typeLike', format: ['PascalCase'], leadingUnderscore: 'forbid', trailingUnderscore: 'forbid'},
      {selector: 'variable', modifiers: ['const'], format: ['camelCase', 'UPPER_CASE', 'PascalCase'], leadingUnderscore: 'forbid', trailingUnderscore: 'forbid'},
      {selector: 'variable', modifiers: ['unused'], format: ['camelCase'], leadingUnderscore: 'allow', trailingUnderscore: 'forbid'},
      {selector: 'parameter', modifiers: ['unused'], format: ['camelCase'], leadingUnderscore: 'allow', trailingUnderscore: 'forbid'},
      {selector: 'objectLiteralProperty', format: null}, // allows literal objects to comply with 3rd party APIs
    ],
    '@typescript-eslint/no-array-constructor': ['error'],
    '@typescript-eslint/no-duplicate-imports': ['error'],
    '@typescript-eslint/no-extra-parens': ['error', 'all', {nestedBinaryExpressions: false}],
    '@typescript-eslint/no-loop-func': ['error'],
    '@typescript-eslint/no-shadow': ['error', { 'builtinGlobals': true, 'allow': ['_'] }],
    '@typescript-eslint/no-unused-expressions': ['error'],
    '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_', varsIgnorePattern: '^_'}],
    '@typescript-eslint/object-curly-spacing': ['error', 'never'], // _prettier_
    '@typescript-eslint/padding-line-between-statements': ['error', // Allows inferred types to be placed close to their constant schemas
      { blankLine: 'always', prev: ['function', 'class', 'multiline-expression', 'multiline-const'], next: '*' },
      { blankLine: 'any', prev: ['multiline-const'], next: ['const', 'return', 'type', 'interface'] },
      { blankLine: 'always', prev: ['import'], next: '*' },
      { blankLine: 'any', prev: ['import'], next: ['import'] },
    ],
    '@typescript-eslint/quotes': ['error', 'single'],
    '@typescript-eslint/return-await': ['error'],
    '@typescript-eslint/semi': ['error', 'never'], // complementary to @typescript-eslint/member-delimiter-style
    '@typescript-eslint/space-before-function-paren': ['error', {named: 'never', anonymous: 'always', asyncArrow: 'always'}],
    '@typescript-eslint/space-infix-ops':  ['error', {int32Hint: false}],
  },
  overrides: [
    {
      files: ['index.ts'],
      rules: {
        // Enforce types for module boundaries for index (dir-modules)
        '@typescript-eslint/explicit-module-boundary-types': 'error',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        // 3rd party APIs are not controlled by the scope of the project
        '@typescript-eslint/naming-convention': ['off'],
      },
    },
    {
      files: ['*.spec.ts'],
      rules: {
        // These rules override configuration for test files (*.spec.ts).
        'max-len': ['warn', {code: 120, ignoreComments: true}],
        'max-lines-per-function': ['off'],
        'max-lines': ['off'],
        '@typescript-eslint/no-unsafe-assignment': ['off'],
        '@typescript-eslint/no-unsafe-member-access': ['off'],
      },
    },
  ],
}
