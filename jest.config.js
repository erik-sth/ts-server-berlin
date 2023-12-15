// eslint-disable-next-line no-undef
module.exports = {
    transform: {
        '^.+\\.(ts)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
    },
    moduleFileExtensions: ['ts', 'js'],
    testMatch: ['**/test/**/*.test.(ts|js)'],
    testEnvironment: 'node',
    maxWorkers: 1,
};
