import { Ionicons } from "@expo/vector-icons";
import {
	Pressable,
	StyleSheet,
	TextInput,
	type TextInputProps,
	View,
} from "react-native";
import { Colors } from "../../constant/colors";
import { Spacing } from "../../constant/spacing";
import { Typography } from "../../constant/typography";
import { useTheme } from "../../context/ThemeContext";

type SearchProps = TextInputProps & {
	onPress: () => void;
};

export const Search = ({ onPress, ...rest }: SearchProps) => {
	const { colors, isDark } = useTheme();

	return (
		<View
			style={[
				styles.inputContainer,
				{
					backgroundColor: colors.card,
					borderColor: isDark ? "transparent" : Colors.neutral50,
				},
			]}
		>
			<TextInput
				{...rest}
				style={[styles.text, { color: colors.text.primary }]}
				placeholder="Keyboard"
				placeholderTextColor={colors.text.primary}
				returnKeyType="search"
				autoCorrect={false}
			/>
			<Pressable
				style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
				onPress={onPress}
				accessibilityLabel="Search"
				accessibilityRole="button"
			>
				<Ionicons
					name="search"
					size={Spacing.spacing300}
					color={isDark ? colors.text.primary : Colors.purple500}
				/>
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
