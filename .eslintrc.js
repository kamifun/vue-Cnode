module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // use `;` end of stament
    "semi": [2, "always"],
    // before function `(` not space
    "space-before-function-paren": [0, "always"],
    // disable same function arguments
    "no-dupe-args": 2,
    // disable spaces and tabs use together
    "no-mixed-spaces-and-tabs": [2, false],
    // disable before called function use space
    "no-spaced-func": 2
  }
}
