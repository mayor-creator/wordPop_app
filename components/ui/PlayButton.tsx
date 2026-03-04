import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { Colors } from "../../constant/colors";
import { useTheme } from "../../context/ThemeContext";

type PlayButtonProps = {
	onPress: () => void;
	disabled: boolean;
};

export const PlayButton = ({ onPress, disabled }: PlayButtonProps) => {
	const { width } = useWindowDimensions();
	const { isDark } = useTheme();

	const BUTTON_SIZE = Math.min(width * 0.18, 120);
	const ICON_SIZE = BUTTON_SIZE * 0.4;

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
				isDark ? styles.darkButtonBackground : styles.lightButtonBackground,
				pressed && styles.pressed,
			]}
			onPress={onPress}
			disabled={disabled}
			accessibilityLabel="Play"
			accessibilityRole="button"
			accessibilityHint="Start word audio playback"
			hitSlop={10}
		>
			<Ionicons
				name="play"
				size={ICON_SIZE}
				color={isDark ? Colors.neutral0 : Colors.purple500}
			/>
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
