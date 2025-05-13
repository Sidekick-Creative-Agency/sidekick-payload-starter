import reactHooks from 'eslint-plugin-react-hooks'
module.exports = {
  extends: 'next',
  root: true,
  plugins: { 'react-hooks': reactHooks },
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@next/next/no-img-element': 'off',
  },
}
