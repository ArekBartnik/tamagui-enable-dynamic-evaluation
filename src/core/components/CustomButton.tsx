import { cloneElement, useContext } from "react";
import { getRadius, getSize, getSpace } from "@tamagui/get-token";
import {
	createStyledContext,
	SizableText,
	SizeTokens,
	Stack,
	styled,
	useTheme,
	withStaticProperties,
} from "tamagui";

const CustomButtonContext = createStyledContext({
	size: "$1" as SizeTokens,
});

export const CustomButtonFrame = styled(Stack, {
	name: "CustomButton",
	context: CustomButtonContext,
	backgroundColor: "$color4",
	display: "inline-flex",
	alignItems: "center",
	flexDirection: "row",
	variants: {
		size: {
			"...size": (name, { tokens }) => {
				return {
					borderRadius: getRadius(name),
					height: getSize(name, { shift: -3 }),
					gap: tokens.space[name].val * 0.2,
					paddingHorizontal: getSpace(name, {
						shift: -2,
					}),
				};
			},
		},
	} as const,
	defaultVariants: {
		size: "$2",
	},
});

const CustomButtonText = styled(SizableText, {
	name: "CustomButtonText",
	context: CustomButtonContext,
	color: "$color",
	userSelect: "none",
	variants: {
		size: {
			"...fontSize": (name, { font }) => {
				return {
					fontSize: font?.size[name],
				};
			},
		},
	} as const,
});

const CustomButtonIcon = (props: { children: any }) => {
	const { size } = useContext(CustomButtonContext.context);

	const smaller = getSize(size, {
		shift: -2,
	});

	const theme = useTheme();

	return cloneElement(props.children, {
		size: smaller.val * 0.5,
		color: theme.color.get(),
	});
};

export const CustomButton = withStaticProperties(CustomButtonFrame, {
	Props: CustomButtonContext.Provider,
	Text: CustomButtonText,
	Icon: CustomButtonIcon,
});
