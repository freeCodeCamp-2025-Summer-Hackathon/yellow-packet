export default {
	testEnvironment: 'node',
	transform: {},
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1'
	},
	projects: [
		{
			displayName: 'unit',
			testMatch: ['<rootDir>/tests/units/**/*.test.js'],
			setupFilesAfterEnv: ['<rootDir>/tests/setup/unit-setup.js'],
			testTimeout: 5000
		},
		{
			displayName: 'integration',
			testMatch: ['<rootDir>/tests/integrations/**/*.test.js'],
			setupFilesAfterEnv: ['<rootDir>/tests/setup/integration-setup.js'],
			testTimeout: 10000
		}
	],
	collectCoverageFrom: [
		'controllers/**/*.js',
		'routes/**/*.js',
		'!**/node_modules/**',
		'!tests/**'
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov', 'html']
};
