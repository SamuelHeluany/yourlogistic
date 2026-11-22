import type { Config } from "jest";

const config: Config = {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest/presets/default-esm",
  extensionsToTreatAsEsm: [".ts"],
  testEnvironment: "node",
  // Nome do projeto (rootdir) que vai procurando dentro do src qualquer pasta que tenha .test.ts
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  moduleNameMapper: {
    // @/app.js -> src/app (o Jest resolve a extensão .ts sozinho)
    "^@/(.*)\\.js$": "<rootDir>/src/$1",
    // @/app -> src/app
    "^@/(.*)$": "<rootDir>/src/$1",
    // ./routes/index.js -> ./routes/index
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true }],
  },
};

export default config;
