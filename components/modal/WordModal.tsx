import { useContext } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constant/colors";
import { BorderRadius, Spacing } from "../../constant/spacing";
import { Typography } from "../../constant/typography";
import { DictionaryContext } from "../../context/DictionaryContext";
import { useTheme } from "../../context/ThemeContext";
import type { DictionaryEntry } from "../../types/types";

type WordModalProps = {
	visible: boolean;
	word: DictionaryEntry | null;
	onClose: () => void;
};

export const WordModal = ({ visible, word, onClose }: WordModalProps) => {
	const context = useContext(DictionaryContext);
	if (!context) {
		throw new Error("WordModal must be used within DictionaryProvider");
	}

	const { removeWord } = context;
	const { colors, isDark } = useTheme();

	if (!word) return null;

	const meaning = word.meanings?.[0];
	const definition = meaning?.definitions?.[0];

	const handleDeleteWord = async () => {
		await removeWord(word.word);
		onClose();
	};

	return (
		<Modal visible={visible} animationType="slide" transparent>
			<View style={styles.overlay}>
				<View
					style={[
						styles.modalCard,
						{ backgroundColor: colors.background.primary },
					]}
				>
					<View style={styles.header}>
						<Text style={[styles.wordText, { color: colors.text.primary }]}>
							{word.word}
						</Text>
						{meaning?.partOfSpeech && (
							<Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
						)}
					</View>

					<View
						style={[
							styles.divider,
							{
								backgroundColor: isDark ? Colors.neutral700 : Colors.neutral200,
							},
						]}
					/>

					<Text style={[styles.definitionText, { color: colors.text.primary }]}>
						{definition?.definition}
					</Text>

					{definition?.example && (
						<View
							style={[
								styles.exampleContainer,
								{
									backgroundColor: isDark
										? Colors.neutral800
										: Colors.neutral100,
									borderLeftColor: Colors.purple500,
								},
							]}
						>
							<Text
								style={[styles.exampleText, { color: colors.text.secondary }]}
							>
								"{definition.example}"
							</Text>
						</View>
					)}

					<View
						style={[
							styles.divider,
							{
								backgroundColor: isDark ? Colors.neutral700 : Colors.neutral200,
							},
						]}
					/>

					<View style={styles.actions}>
						<Pressable
							style={({ pressed }) => [
								styles.button,
								styles.deleteButton,
								{
									backgroundColor: isDark
										? Colors.neutral800
										: Colors.neutral100,
									borderColor: Colors.red500,
								},
								pressed && styles.pressed,
							]}
							onPress={handleDeleteWord}
						>
							<Text style={[styles.buttonText, { color: Colors.red500 }]}>
								Delete
							</Text>
						</Pressable>

						<Pressable
							style={({ pressed }) => [
								styles.button,
								styles.closeButton,
								{
									backgroundColor: isDark ? Colors.purple500 : Colors.purple600,
								},
								pressed && styles.pressed,
							]}
							onPress={onClose}
						>
							<Text style={[styles.buttonText, { color: Colors.neutral0 }]}>
								Close
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalCard: {
		borderTopLeftRadius: BorderRadius.radius16,
		borderTopRightRadius: BorderRadius.radius16,
		padding: Spacing.spacing400,
		gap: Spacing.spacing300,
	},
	header: {
		gap: Spacing.spacing100,
	},
	wordText: {
		fontFamily: Typography.wordText.fontFamily,
		fontSize: Typography.wordText.fontSize,
	},
	partOfSpeech: {
		fontFamily: Typography.body.fontFamily,
		fontSize: Typography.body.fontSize,
		color: Colors.purple500,
	},
	divider: {
		height: 1,
	},
	definitionContainer: {
		gap: Spacing.spacing200,
	},
	label: {
		fontFamily: Typography.body.fontFamily,
		fontSize: Typography.body.fontSize,
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	definitionText: {
		fontFamily: Typography.body.fontFamily,
		fontSize: Typography.body.fontSize,
		lineHeight: 24,
	},
	exampleContainer: {
		borderLeftWidth: 3,
		paddingLeft: Spacing.spacing200,
		paddingVertical: Spacing.spacing100,
		borderRadius: BorderRadius.radius10,
	},
	exampleText: {
		fontFamily: Typography.body.fontFamily,
		fontSize: Typography.body.fontSize,
		fontStyle: "italic",
		lineHeight: 22,
	},
	actions: {
		flexDirection: "row",
		gap: Spacing.spacing200,
		marginTop: Spacing.spacing100,
	},
	button: {
		flex: 1,
		paddingVertical: Spacing.spacing200,
		borderRadius: BorderRadius.radius10,
		alignItems: "center",
		justifyContent: "center",
	},
	deleteButton: {
		borderWidth: 1,
	},
	closeButton: {
		borderWidth: 0,
	},
	buttonText: {
		fontFamily: Typography.body.fontFamily,
		fontSize: Typography.body.fontSize,
	},
	pressed: {
		opacity: 0.7,
		transform: [{ scale: 0.95 }],
	},
});
