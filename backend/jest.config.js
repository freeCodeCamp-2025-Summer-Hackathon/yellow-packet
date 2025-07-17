export default {
	testEnvironment: 'node',
	testMatch: [
		'**/tests/**/*.js'
	],
	transform: {},
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1'
	}
};
