export default {
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**"],
  globalSetup: "<rootDir>/jest.globalSetup.ts",
  globalTeardown: "<rootDir>/jest.globalTeardown.ts",
  setupFilesAfterEnv: ["<rootDir>/jest.setupFilesAfterEnv.ts"],
  testMatch: ["<rootDir>/test/**/*.spec.ts"],
  testTimeout: 5 * 60 * 1000,
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
};
