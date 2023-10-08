const { withBlitz } = require("@blitzjs/next");
const withBundleAnalyzer = require("@next/bundle-analyzer");
const { withTamagui } = require("@tamagui/next-plugin");

const boolVals = {
	true: true,
	false: false,
};

const disableExtraction =
	boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === "development";

const plugins = [
	withBlitz,
	withBundleAnalyzer({
		enabled: process.env.ANALYZE === "true",
	}),
	withTamagui({
		useReactNativeWebLite: true,
		config: "./tamagui.config.ts",
		outputCSS: process.env.NODE_ENV === "production" ? "./public/tamagui.css" : null,
		components: ["tamagui"],
		logTimings: true,
		enableDynamicEvaluation: true,
		disableExtraction,
		excludeReactNativeWebExports: ["Switch", "ProgressBar", "Picker", "CheckBox"],
	}),
	(config) => {
		return {
			...config,
			webpack(webpackConfig, options) {
				webpackConfig.resolve.alias ??= {};

				// https://github.com/theKashey/react-remove-scroll/pull/78
				// react-remove-scroll + getting rid of tslib in general
				Object.assign(webpackConfig.resolve.alias, {
					tslib: "@tamagui/proxy-worm",
				});
				webpackConfig.resolve.mainFields.unshift("module:es2019");

				if (process.env.PROFILE) {
					webpackConfig.resolve.alias["react-dom"] = require.resolve("react-dom/profiling");
					webpackConfig.optimization.minimize = false;
				}

				if (typeof config.webpack === "function") {
					return config.webpack(webpackConfig, options);
				}
				return webpackConfig;
			},
		};
	},
];

module.exports = function () {
	/**
	 * @type {import("@blitzjs/next").BlitzConfig}
	 */
	let config = {
		output: "standalone",
		swcMinify: true,
		reactStrictMode: true,
		experimental: {
			scrollRestoration: true,
		},
		poweredByHeader: false, // remove X-Powered-By: Next.js header
		modularizeImports: {
			"@tamagui/lucide-icons": {
				transform: `@tamagui/lucide-icons/dist/esm/icons/{{kebabCase member}}`,
				skipDefaultConversion: true,
			},
		},
		async headers() {
			const cacheHeaders = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
			return [{ source: "/_next/static/:static*", headers: cacheHeaders }];
		},
	};

	for (const plugin of plugins) {
		config = {
			...config,
			...plugin(config),
		};
	}

	return config;
};
