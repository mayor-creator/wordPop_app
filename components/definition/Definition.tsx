import { StyleSheet, Text, View } from "react-native";
import { Spacing } from "../../constant/spacing";
import { Typography } from "../../constant/typography";
import { useTheme } from "../../context/ThemeContext";
import type { Meaning } from "../../types/types";

type DefinitionProps = {
	meanings: Meaning[];
};

export const Definitions = ({ meanings }: DefinitionProps) => {
	const { colors } = useTheme();

	if (!meanings?.length) {
		return <Text>No definitions found.</Text>;
	}

	return (
		<View>
			{meanings.map((meaning) => (
				<View
					key={`${meaning.partOfSpeech}-${meaning.definitions.length}`}
					style={styles.meaningContainer}
				>
					{/* Part of speech (shown once) */}
					<Text
						style={[styles.partOfSpeechText, { color: colors.text.primary }]}
					>
						{meaning.partOfSpeech}
					</Text>

					{/* Definitions */}
					{meaning.definitions.map((def) => (
						<View key={def.definition}>
							<View style={styles.definitionContent}>
								<Text
									style={[
										styles.definitionText,
										{ color: colors.text.primary },
									]}
								>
									{def.definition}
								</Text>
								{def.example && (
									<Text
										style={[
											styles.exampleText,
											{ color: colors.text.secondary },
										]}
									>
										Example: {def.example}
									</Text>
								)}
							</View>
						</View>
					))}
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	meaningContainer: {
		marginBottom: Spacing.spacing500,
	},

	definitionContent: {
		flex: 1,
		marginTop: Spacing.spacing200,
		gap: Spacing.spacing150,
	},

	partOfSpeechText: {
		fontFamily: Typography.h2.fontFamily,
		fontSize: Typography.h2.fontSize,
	},

	definitionText: {
		fontFamily: Typography.body.fontFamily,
		fontSize: Typography.body.fontSize,
	},

	exampleText: {
		fontFamily: Typography.body.fontFamily,
		fontSize: Typography.body.fontSize,
	},
});
