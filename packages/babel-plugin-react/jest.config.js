const path = require("path");

module.exports = {
  verbose: true,
  roots: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/**/?(*.)test.{ts,tsx}'], 
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  modulePaths: ["<rootDir>/src/"],
  moduleNameMapper: {
    "@impractical/env": path.join(__dirname, '../env/src'),
    "@impractical/react": path.join(__dirname, '../react/src')
  },
  testEnvironment: "jsdom"
};
