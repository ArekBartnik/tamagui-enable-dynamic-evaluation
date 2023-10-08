import getConfig from "next/config";
import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { StyleSheet } from "react-native";
import { LoadInterVar, LoadInterVarItalic } from "src/core/components/LoadFont";
import Tamagui from "../../tamagui.config";

const { publicRuntimeConfig } = getConfig();

export default class Document extends NextDocument {
	static async getInitialProps({ renderPage }) {
		const page = await renderPage();

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore RN doesn't have this type
		const rnwStyle = StyleSheet.getSheet();

		return {
			...page,
			styles: (
				<>
					<style id={rnwStyle.id} dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }} />
					<style
						dangerouslySetInnerHTML={{
							__html: Tamagui.getCSS({
								// if you are using "outputCSS" option, you should use this "exclude"
								// if not, then you can leave the option out
								exclude: process.env.NODE_ENV === "production" ? "design-system" : null,
							}),
						}}
					/>
				</>
			),
		};
	}

	render() {
		return (
			<Html data-app-version={publicRuntimeConfig?.version}>
				<Head>
					<LoadInterVar />
					<LoadInterVarItalic />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
