module.exports = {
  semi: false,
  singleQuote: true,
  printWidth: 100,
  trailingComma: 'none',
  importOrder: [
    '^@/app/(.*)$',
    '^@/components/(.*)$',
    '^@/hooks/(.*)$',
    '^@/lib/(.*)$',
    '^@/utils(.*)$',
    '^@/constants(.*)$',
    '^@/context/(.*)$',
    '^@/types/(.*)$',
    '^@/(.*)$',
    '^[./]'
  ],
  importOrderSortSpecifiers: true,
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@trivago/prettier-plugin-sort-imports')
  ]
}
