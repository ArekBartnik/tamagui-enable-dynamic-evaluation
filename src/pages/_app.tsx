import "@tamagui/core/reset.css";
import "../app.css";

import { Suspense } from "react";
import { AppProps } from "@blitzjs/next";
import Head from "next/head";
import { Spinner, TamaguiProvider } from "tamagui";
import { withBlitz } from "src/blitz-client";
import config from "../../tamagui.config";

if (process.env.NODE_ENV === "production") {
	require("../../public/tamagui.css");
}

function App({ Component, pageProps }: AppProps) {
	const getLayout = Component.getLayout || ((page) => page);

	return (
		<>
			<Head>
				<meta content="width=device-width, initial-scale=1.0" name="viewport" />
				<title>hello world</title>
				<meta name="robots" content="noindex,nofollow" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="format-detection" content="telephone=no" />
			</Head>

			<script
				key="tamagui-animations-mount"
				type="text/javascript"
				dangerouslySetInnerHTML={{
					// avoid flash of animated things on enter
					__html: `document.documentElement.classList.add('t_unmounted')`,
				}}
			/>

			<TamaguiProvider config={config} defaultTheme="light">
				<Suspense fallback={<Spinner size="large" />}>
					{getLayout(<Component {...pageProps} />)}
				</Suspense>
			</TamaguiProvider>
		</>
	);
}

export default withBlitz(App);
