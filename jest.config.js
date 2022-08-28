module.exports = {
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'lcov', 'text'],
    collectCoverageFrom: [
      'packages/*/src/**/*.ts',
      '!packages/runtime-test/src/utils/**',
      '!packages/template-explorer/**',
      '!packages/sfc-playground/**',
      '!packages/size-check/**',
      '!packages/runtime-core/src/profiling.ts',
      '!packages/runtime-core/src/customFormatter.ts',
      // DOM transitions are tested via e2e so no coverage is collected
      '!packages/runtime-dom/src/components/Transition*',
      // only called in browsers
      '!packages/vue/src/devCheck.ts',
      // only used as a build entry
      '!packages/vue/src/runtime.ts',
      // mostly just entries
      '!packages/vue-compat/**'
    ],
    watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    moduleNameMapper: {
      '^@vue/(.*?)$': '<rootDir>/packages/$1/src'
    },
    rootDir: __dirname,
    testMatch: ['<rootDir>/packages/**/__tests__/**/*spec.[jt]s?(x)']
  }
  