export default {
  injectGlobals: true,
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[j]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
