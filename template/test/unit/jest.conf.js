const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../../'),
  moduleFileExtensions: [
    'js',{{#typescript}}
    'ts',{{/typescript}}
    'json',
    'vue'
  ],{{#typescript}}
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",{{/typescript}}
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',{{#typescript}}
    '^.+\\.ts$': 'ts-jest',{{/typescript}}
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },{{#e2e}}
  testPathIgnorePatterns: [
    '<rootDir>/test/e2e'
  ],{{/e2e}}
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
  setupFiles: ['<rootDir>/test/unit/setup'],
  mapCoverage: true,
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    {{#router}}
    '!src/router/index.js',
    {{/router}}
    '!**/node_modules/**'
  ]
}
