import { useAudioPlayer } from "expo-audio";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constant/colors";
import { Spacing } from "../../constant/spacing";
import { Typography } from "../../constant/typography";
import { useTheme } from "../../context/ThemeContext";
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
	const { colors } = useTheme();
	const player = useAudioPlayer(audioUrl ?? null);

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
				<Text style={[styles.word, { color: colors.text.primary }]}>
					{word}
				</Text>
				<Text style={styles.pronunciation}>{pronunciation}</Text>
			</View>
			<PlayButton onPress={handleWordSoundPlay} disabled={!audioUrl} />
		</View>
	);
};

const styles = StyleSheet.create({
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
});
