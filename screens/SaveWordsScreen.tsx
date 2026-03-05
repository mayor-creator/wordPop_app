import { useContext, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WordModal } from "../components/modal/WordModal";
import { Colors } from "../constant/colors";
import { BorderRadius, Spacing } from "../constant/spacing";
import { Typography } from "../constant/typography";
import { DictionaryContext } from "../context/DictionaryContext";
import { useTheme } from "../context/ThemeContext";
import type { DictionaryEntry } from "../types/types";

export const SaveWordsScreen = () => {
	const context = useContext(DictionaryContext);
	if (!context) {
		throw new Error("SavedWordsScreen must be used within DictionaryProvider");
	}

	const { savedWords } = context;
	const { colors, isDark } = useTheme();

	const [selectedWord, setSelectedWord] = useState<DictionaryEntry | null>(
		null,
	);
	const [modalVisible, setModalVisible] = useState(false);

	const openModal = (word: DictionaryEntry) => {
		setSelectedWord(word);
		setModalVisible(true);
	};

	const renderItem = ({ item }: { item: DictionaryEntry }) => {
		const meaning = item.meanings?.[0];
		const definition = meaning?.definitions?.[0];

		return (
			<Pressable
				style={({ pressed }) => [
					styles.wordCard,
					{
						backgroundColor: isDark ? Colors.neutral900 : Colors.neutral100,
						borderColor: isDark ? Colors.neutral700 : Colors.neutral200,
					},
					pressed && styles.pressed,
				]}
				onPress={() => openModal(item)}
			>
				{/* Word and part of speech */}
				<View style={styles.cardHeader}>
					<Text style={[styles.wordText, { color: colors.text.primary }]}>
						{item.word}
					</Text>
					{meaning?.partOfSpeech && (
						<Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
					)}
				</View>

				{/* Short definition preview */}
				{definition?.definition && (
					<Text
						style={[styles.definitionPreview, { color: colors.text.secondary }]}
						numberOfLines={2}
					>
						{definition.definition}
					</Text>
				)}

				{/* Tap hint */}
				<Text style={[styles.tapHint, { color: colors.text.tertiary }]}>
					Tap to view more
				</Text>
			</Pressable>
		);
	};

	const renderEmpty = () => (
		<View style={styles.emptyContainer}>
			<Text style={[styles.emptyTitle, { color: colors.text.primary }]}>
				No saved words yet
			</Text>
			<Text style={[styles.emptySubtitle, { color: colors.text.secondary }]}>
				Search for a word and tap Save Word to add it here
			</Text>
		</View>
	);

	return (
		<SafeAreaView
			style={[styles.container, { backgroundColor: colors.background.primary }]}
		>
			{/* Header */}
			<View style={styles.header}>
				<Text style={[styles.headerTitle, { color: colors.text.primary }]}>
					Saved Words
				</Text>
				<Text style={[styles.wordCount, { color: colors.text.secondary }]}>
					{savedWords.length} {savedWords.length === 1 ? "word" : "words"}
				</Text>
			</View>

			{/* List */}
			<FlatList
				data={savedWords}
				keyExtractor={(_, index) => index.toString()}
				renderItem={renderItem}
				ListEmptyComponent={renderEmpty}
				contentContainerStyle={[
					styles.listContent,
					savedWords.length === 0 && styles.emptyList,
				]}
				ItemSeparatorComponent={() => <View style={styles.separator} />}
				showsVerticalScrollIndicator={false}
			/>

			<WordModal
				visible={modalVisible}
				word={selectedWord}
				onClose={() => setModalVisible(false)}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: Spacing.spacing300,
		paddingVertical: Spacing.spacing300,
	},
	headerTitle: {
		fontFamily: Typography.h2.fontFamily,
		fontSize: Typography.h2.fontSize,
	},
	wordCount: {
		fontFamily: Typography.body.fontFamily,
		fontSize: Typography.body.fontSize,
	},
	listContent: {
		paddingHorizontal: Spacing.spacing300,
		paddingBottom: Spacing.spacing400,
	},
	emptyList: {
		flex: 1,
		justifyContent: "center",
	},
	wordCard: {
		borderWidth: 1,
		borderRadius: BorderRadius.radius10,
		padding: Spacing.spacing300,
		gap: Spacing.spacing100,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
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
	definitionPreview: {
		fontFamily: Typography.body.fontFamily,
		fontSize: Typography.body.fontSize,
		lineHeight: 22,
	},
	tapHint: {
		fontFamily: Typography.body.fontFamily,
		fontSize: Typography.body.fontSize,
		marginTop: Spacing.spacing100,
	},
	separator: {
		height: Spacing.spacing200,
	},
	pressed: {
		opacity: 0.7,
		transform: [{ scale: 0.98 }],
	},
	emptyContainer: {
		alignItems: "center",
		gap: Spacing.spacing200,
		paddingHorizontal: Spacing.spacing400,
	},
	emptyTitle: {
		fontFamily: Typography.h2.fontFamily,
		fontSize: Typography.h2.fontSize,
		textAlign: "center",
	},
	emptySubtitle: {
		fontFamily: Typography.body.fontFamily,
		fontSize: Typography.body.fontSize,
		textAlign: "center",
		lineHeight: 22,
	},
});
