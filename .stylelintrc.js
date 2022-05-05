module.exports = {
  extends: ['stylelint-config-idiomatic-order'],

  plugins: ['stylelint-order'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
}
