import type { Config } from "jest";

const config: Config = {
  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  // Nome do projeto (rootdir) que vai procurando dentro do src qualquer pasta que tenha .test.ts
  testMatch: ["<rootDir>/src/**/*.test.ts"],
  moduleNameMapper: {
    // mapeamento para usar importação relativa com @
    "^@/(.*)/$": "<rootDir>/src/$1",
  },
};

export default config;
