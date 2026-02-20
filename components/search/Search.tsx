import { Ionicons } from "@expo/vector-icons";
import {
	Pressable,
	StyleSheet,
	TextInput,
	type TextInputProps,
	useColorScheme,
	useWindowDimensions,
	View,
} from "react-native";
import { Colors } from "../../constant/colors";
import { Spacing } from "../../constant/spacing";
import { Typography } from "../../constant/typography";

type SearchProps = {
	onPress: () => void;
	props: TextInputProps;
};

export const Search = ({ onPress, props }: SearchProps) => {
	const colorScheme = useColorScheme();
	const { width } = useWindowDimensions();

	const CONTAINER_WIDTH = width * 0.9;

	const themeIcon =
		colorScheme === "light" ? Colors.purple500 : Colors.neutral0;
	const inputStyle =
		colorScheme === "light" ? styles.lightInput : styles.darkInput;
	const placeHolderStyle =
		colorScheme === "light" ? Colors.neutral800 : Colors.neutral0;
	const textStyle =
		colorScheme === "light" ? styles.lightText : styles.darkText;

	return (
		<View
			style={[styles.inputContainer, inputStyle, { width: CONTAINER_WIDTH }]}
		>
			<TextInput
				{...props}
				style={[styles.text, textStyle]}
				placeholder="Keyboard"
				placeholderTextColor={placeHolderStyle}
				returnKeyType="search"
				autoCorrect={false}
			/>
			<Pressable
				style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
				onPress={onPress}
				accessibilityLabel="Search"
				accessibilityRole="button"
			>
				<Ionicons name="search" size={24} color={themeIcon} />
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: Spacing.spacing300,
		paddingVertical: Spacing.spacing200,
		borderWidth: 1,
		borderRadius: 16,
	},
	lightInput: {
		backgroundColor: Colors.neutral100,
		borderColor: Colors.neutral50,
	},
	darkInput: {
		backgroundColor: Colors.neutral900,
	},
	text: {
		fontFamily: Typography.inputText.fontFamily,
		fontSize: Typography.inputText.fontSize,
	},
	lightText: {
		color: Colors.neutral800,
	},
	darkText: {
		color: Colors.neutral0,
	},
	iconButton: {
		padding: 8,
	},
	pressed: {
		opacity: 0.7,
		transform: [{ scale: 0.95 }],
	},
});
