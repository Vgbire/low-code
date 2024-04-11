module.exports = {
  singleQuote: true,
  // 导入包顺序自动调整--@trivago/prettier-plugin-sort-imports
  importOrder: [
    '^react(.*)$',
    'antd/(.*)',
    '<THIRD_PARTY_MODULES>',
    '^@cmp-portal(.*)$',
    '^src/(.*)$',
    '^./',
    '^../',
  ],
};
