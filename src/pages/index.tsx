import { BlitzPage } from "@blitzjs/next";
import { H3, YStack } from "tamagui";
import { CustomButton } from "src/core/components/CustomButton";
import Layout from "src/core/layouts/Layout";

const Home: BlitzPage = () => {
	return (
		<YStack space="$4" p="$6">
			<H3>Hello world</H3>
			<CustomButton size="$3">
				<CustomButton.Text>custom button</CustomButton.Text>
			</CustomButton>
		</YStack>
	);
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
