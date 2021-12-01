"use strict";

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["jest-sorted"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
