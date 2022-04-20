module.exports = {
  env: {
    amd: true,
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    'taro/react',
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/state-in-constructor': 0,
    'comma-dangle': [2, 'always-multiline'],
    'no-console': 0, //不禁用console
    'no-irregular-whitespace': 0, //不规则的空白不允许
    'no-underscore-dangle': 0,
    'array-bracket-spacing': [2, 'never'], // 指定数组的元素之间要以空格隔开(,后面)
    // withShareTicket: true,
    'prettier/prettier': 'error'
  }
}
