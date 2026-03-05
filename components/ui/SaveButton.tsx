import { useContext, useMemo } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constant/colors";
import { BorderRadius, Spacing } from "../../constant/spacing";
import { Typography } from "../../constant/typography";
import { DictionaryContext } from "../../context/DictionaryContext";
import { useTheme } from "../../context/ThemeContext";

export const SaveButton = () => {
	const context = useContext(DictionaryContext);
	const { isDark } = useTheme();

	if (!context) {
		throw new Error("SavedButton must be used within DictionaryProvider");
	}

	const { data, saveWord, savedWords, removeWord } = context;

	const currentWord = data?.[0]?.word;

	const isSaved = useMemo(() => {
		if (!currentWord) return false;
		return savedWords.some((entry) => entry.word === currentWord);
	}, [savedWords, currentWord]);

	if (!currentWord) return null;

	const handlePress = async () => {
		if (isSaved) {
			await removeWord(currentWord);
		} else {
			await saveWord();
		}
	};

	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				isDark ? styles.darkButtonBackground : styles.lightButtonBackground,
				pressed && styles.pressed,
			]}
			onPress={handlePress}
		>
			<Text style={styles.buttonText}>{isSaved ? "Saved" : "Save Word"}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		borderWidth: 1,
		borderRadius: BorderRadius.radius10,
		padding: Spacing.spacing100,
		width: "30%",
	},
	buttonText: {
		fontFamily: Typography.body.fontFamily,
		fontSize: Typography.body.fontSize,
		textAlign: "center",
	},
	pressed: {
		opacity: 0.7,
		transform: [{ scale: 0.95 }],
	},
	lightButtonBackground: {
		backgroundColor: Colors.purple100,
		borderColor: Colors.neutral50,
	},
	darkButtonBackground: {
		backgroundColor: Colors.purple500,
	},
});
