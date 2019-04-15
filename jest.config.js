module.exports = {
  testRegex: "/__tests__/.*(\\.test.js|\\test.jsx)$",
  setupTestFrameworkScriptFile: "<rootDir>/test-setup.js",
  moduleFileExtensions: ["js", "json", "jsx"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  modulePaths: ["<rootDir>/src", "<rootDir>/server"],
  collectCoverageFrom: ["<rootDir>/src/**/*.js", "<rootDir>/server/**/*.js"],
  coveragePathIgnorePatterns: [
    "__tests__",
    "__mocks__",
    "node_modules",
    "test_helpers",
    "flow-types.js",
  ],
  // transformIgnorePatterns: [
  //   // "node_modules/(?!(react-native|react-router-native)/)",
  //   "node_modules",
  // ],
  // transform: {
  //   "^.+\\.js$": require.resolve("react-native/jest/preprocessor.js"),
  // },
  testEnvironment: "node",
  preset: "react-native",
  verbose: true,
};
