/**
 * @type{import("prettier").Options}
 **/
module.exports = {
	singleQuote: false,
	tabWidth: 2,
	useTabs: true,
	printWidth: 100,
	trailingComma: "all",
	htmlWhitespaceSensitivity: "ignore",
	importOrderParserPlugins: ["typescript", "jsx"],
	importOrderTypeScriptVersion: "5.0.0",
	importOrder: ["^(react)$", "<THIRD_PARTY_MODULES>", "^src/(.*)$", "^[./]", ""],
	overrides: [
		{
			files: ["**/*.json"],
			options: {
				useTabs: false,
			},
		},
	],
	plugins: ["@ianvs/prettier-plugin-sort-imports"],
};
