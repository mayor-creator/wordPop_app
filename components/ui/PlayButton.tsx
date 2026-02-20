import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import {
	Pressable,
	StyleSheet,
	useColorScheme,
	useWindowDimensions,
} from "react-native";
import { Colors } from "../../constant/colors";

type PlayButtonProps = {
	onPress: () => void;
};

export const PlayButton = ({ onPress }: PlayButtonProps) => {
	const { width } = useWindowDimensions();

	const BUTTON_SIZE = Math.min(width * 0.18, 120);
	const ICON_SIZE = BUTTON_SIZE * 0.4;

	const colorScheme = useColorScheme();

	const themeIcon =
		colorScheme === "light" ? Colors.purple500 : Colors.neutral0;

	const themeButtonStyle =
		colorScheme === "light"
			? styles.lightButtonBackground
			: styles.darkButtonBackground;

	const dynamicSizeStyle = useMemo(
		() => ({
			width: BUTTON_SIZE,
			height: BUTTON_SIZE,
			borderRadius: BUTTON_SIZE / 2,
		}),
		[BUTTON_SIZE],
	);

	return (
		<Pressable
			style={({ pressed }) => [
				dynamicSizeStyle,
				styles.playButton,
				themeButtonStyle,
				pressed && styles.pressed,
			]}
			onPress={onPress}
			accessibilityLabel="Play"
			accessibilityRole="button"
			accessibilityHint="Start word audio playback"
			hitSlop={10}
		>
			<Ionicons name="play" size={ICON_SIZE} color={themeIcon} />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	playButton: {
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	lightButtonBackground: {
		backgroundColor: Colors.purple100,
		borderColor: Colors.neutral50,
	},

	darkButtonBackground: {
		backgroundColor: Colors.purple500,
	},

	pressed: {
		opacity: 0.7,
		transform: [{ scale: 0.95 }],
	},
});
