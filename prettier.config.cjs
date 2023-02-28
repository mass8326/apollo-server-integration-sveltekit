module.exports = {
	useTabs: true,
	printWidth: 100,
	plugins: ["prettier-plugin-svelte"],
	pluginSearchDirs: ["."],
	overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};
