import type { Config } from "jest";

const config: Config = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: [
        "<rootDir>/jest-setup.ts"
    ],
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif)$": "<rootDir>/src/__mocks__/fileMock.ts"
    }
};

export default config;