// support self-signed certs
require("dotenv").config();

module.exports = {
  moduleFileExtensions: ["module.js", "module.d.ts", "js", "json", "ts"],
  rootDir: "test",
  preset: "@eresearchqut/jest-testcontainers",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}],
  },
  testTimeout: 60000,
  maxConcurrency: 1,
  maxWorkers: 1,
};
