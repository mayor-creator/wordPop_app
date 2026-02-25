import { useAudioPlayer } from "expo-audio";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Colors } from "../../constant/colors";
import { Spacing } from "../../constant/spacing";
import { Typography } from "../../constant/typography";
import { PlayButton } from "../ui/PlayButton";

type PronunciationProps = {
	word: string;
	pronunciation: string;
	audioUrl?: string;
};

export const Pronunciation = ({
	word,
	pronunciation,
	audioUrl,
}: PronunciationProps) => {
	const colorScheme = useColorScheme();
	const player = useAudioPlayer(audioUrl ?? null);

	const textStyle =
		colorScheme === "light" ? styles.lightText : styles.darkText;

	const handleWordSoundPlay = () => {
		if (!audioUrl) {
			return;
		}
		player.seekTo(0);
		player.play();
	};

	return (
		<View style={styles.pronunciationContainer}>
			<View style={styles.textContainer}>
				<Text style={[styles.word, textStyle]}>{word}</Text>
				<Text style={styles.pronunciation}>{pronunciation}</Text>
			</View>
			<PlayButton onPress={handleWordSoundPlay} disabled={!audioUrl} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: Spacing.spacing300,
		paddingRight: Spacing.spacing300,
		gap: Spacing.spacing400,
	},

	pronunciationContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	textContainer: {
		gap: Spacing.spacing100,
	},

	word: {
		fontSize: Typography.wordText.fontSize,
		fontFamily: Typography.wordText.fontFamily,
	},

	pronunciation: {
		fontSize: Typography.h2.fontSize,
		fontFamily: Typography.h2.fontFamily,
		color: Colors.purple500,
	},

	lightText: {
		color: Colors.neutral800,
	},

	darkText: {
		color: Colors.neutral0,
	},
});
