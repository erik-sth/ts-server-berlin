module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/test/**/*.test.(ts|js)"],
  testEnvironment: "node",
};
