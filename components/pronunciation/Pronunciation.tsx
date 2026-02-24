import { StyleSheet, Text, View } from "react-native";
import { Spacing } from "../../constant/spacing";
import { PlayButton } from "../ui/PlayButton";

type PronunciationProps = {
	word: string;
	pronunciation: string;
};

export const Pronunciation = ({ word, pronunciation }: PronunciationProps) => {
	return (
		<View style={styles.pronunciationContainer}>
			<View style={styles.textContainer}>
				<Text>{word}</Text>
				<Text>{pronunciation}</Text>
			</View>
			<PlayButton onPress={() => console.log("Play")} />
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
		borderWidth: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	textContainer: {
		gap: Spacing.spacing100,
	},
});
