module.exports = {
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageReporters: [
		"html",
		"text-summary"
	],
	coveragePathIgnorePatterns: [
		"__fixtures__"
	],
	modulePaths: [
		"<rootDir>",
		"<rootDir>/src"
	],
	setupFilesAfterEnv: [
		"@testing-library/jest-dom/extend-expect"
	],
	testEnvironment: "jsdom"
};
