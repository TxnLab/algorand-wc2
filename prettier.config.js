module.exports = {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'none',
  importOrder: [
    '^@/src/components/(.*)$',
    '^@/src/hooks/(.*)$',
    '^@/src/utils/(.*)$',
    '^@/src/constants/(.*)$',
    '^@/src/context/(.*)$',
    '^@/src/types/(.*)$',
    '^@/(.*)$',
    '^[./]'
  ],
  importOrderSortSpecifiers: true,
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@trivago/prettier-plugin-sort-imports')
  ]
}
