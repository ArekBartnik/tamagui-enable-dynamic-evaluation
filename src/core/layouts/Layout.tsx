import { type ReactNode } from "react";
import { BlitzLayout } from "@blitzjs/next";
import Head from "next/head";
import { YStack } from "tamagui";

const Layout: BlitzLayout<{ title?: string; children?: ReactNode }> = ({ title, children }) => {
	return (
		<>
			<Head>
				<title>{title || "hello world"}</title>
			</Head>
			<YStack>{children}</YStack>
		</>
	);
};

export default Layout;
