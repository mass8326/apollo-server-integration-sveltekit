const groups = ["type", "builtin", "external", "internal", "parent", "index", "sibling", "object"];

/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:import/recommended",
		"plugin:import/typescript",
		"plugin:unicorn/recommended",
		"prettier",
	],
	plugins: ["svelte3", "@typescript-eslint", "import", "unicorn"],
	ignorePatterns: ["*.cjs"],
	overrides: [{ files: ["*.svelte"], processor: "svelte3/svelte3" }],
	settings: {
		"svelte3/typescript": () => require("typescript"),
		"import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
		"import/resolver": { typescript: { alwaysTryTypes: true } },
	},
	parserOptions: { sourceType: "module", ecmaVersion: "latest" },
	env: { browser: true, node: true, es2022: true },
	rules: {
		"@typescript-eslint/no-unused-vars": "error",
		"import/no-unresolved": "off",
		"import/order": ["warn", { groups, alphabetize: { order: "asc" } }],
		"sort-imports": ["warn", { ignoreDeclarationSort: true }],
		"unicorn/no-null": "off",
		"unicorn/prevent-abbreviations": "off",
		"unicorn/template-indent": ["warn", { indent: "\t" }],
	},
};
