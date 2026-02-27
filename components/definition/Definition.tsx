import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Colors } from "../../constant/colors";
import { Spacing } from "../../constant/spacing";
import { Typography } from "../../constant/typography";
import type { Meaning } from "../../types/types";

type DefinitionProps = {
	meanings: Meaning[];
};

export const Definitions = ({ meanings }: DefinitionProps) => {
	const colorScheme = useColorScheme();

	const textStyle =
		colorScheme === "light" ? styles.lightText : styles.darkText;

	const definitionStyle =
		colorScheme === "light"
			? styles.definitionLightText
			: styles.definitionDarkText;

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
					<Text style={[styles.partOfSpeechText, textStyle]}>
						{meaning.partOfSpeech}
					</Text>

					{/* Definitions */}
					{meaning.definitions.map((def) => (
						<View key={def.definition}>
							<View style={styles.definitionContent}>
								<Text style={[styles.definitionText, definitionStyle]}>
									{def.definition}
								</Text>
								{def.example && (
									<Text style={[styles.exampleText, definitionStyle]}>
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

	lightText: {
		color: Colors.neutral800,
	},

	darkText: {
		color: Colors.neutral0,
	},

	definitionLightText: {
		color: Colors.neutral800,
	},

	definitionDarkText: {
		color: Colors.neutral0,
	},
});
