module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: '<rootDir>/test/coverage',
    coveragePathIgnorePatterns: [
      '\\\\node_modules\\\\',
    ],
    roots: ['<rootDir>/test'],
    testEnvironment: 'node',
    testTimeout: 100000,
}