/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "./scripts/jestGlobalSetup.ts",
  globalTeardown: "./scripts/jestGlobalTeardown.ts",
}
