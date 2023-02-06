/**
 * {@link https://jestjs.io/docs/configuration|(full reference)}
 * @type {import('@jest/types').Config.InitialOptions}
 */

const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  coverageDirectory: 'out/coverage', // Directory where Jest should output its coverage files
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],

  rootDir: '.',   // applied to all paths Jest references, including outputs
  roots: ['src'], // directories that Jest should use to search for test files

  // performance related
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['**/*.spec.ts'],

  globalSetup: './jest.setup.js',
  transform: {
    '.ts$': [
      'ts-jest', {
        // Disables type-checking - which is already checked by the compiler.
        // Reduces significantly the test suite's run time
        isolatedModules: true,
      }
    ],
  },
}
module.exports = config
