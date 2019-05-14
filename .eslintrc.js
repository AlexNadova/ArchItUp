module.exports = {
  env: {
    node: true,
    es6: true
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    quotes: [2, "double", "avoid-escape"],
    "linebreak-style": [2, "unix"],
    "comma-dangle": [2, "only-multiline"],
    "no-cond-assign": [2, "always"],
    "no-console": 1,
    "no-constant-condition": 2,
    "no-debugger": 1,
    "no-dupe-args": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-empty": 1,
    "no-extra-parens": [2, "all"],
    "no-extra-semi": 2,
    "no-func-assign": 1,
    "no-inner-declarations": [1, "both"],
    "no-irregular-whitespace": 1,
    "no-negated-in-lhs": 2,
    "no-obj-calls": 2,
    "no-sparse-arrays": 2,
    "no-unreachable": 2,
    "use-isnan": 2,
    "valid-typeof": 2,
    "no-fallthrough": 2,
    "no-octal": 1,
    "no-redeclare": 2,
    "no-delete-var": 2,
    "no-undef": 2,
    /*eslint-env node*/
    "no-unused-vars": 1,
    "no-multiple-empty-lines": [2, { max: 1 }],
    "no-var": 2,
    "prefer-const": 2
  },
  env: { node: true, mocha: true }
};
