import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Colors, DarkColors } from "./constant/colors";
import { Typography } from "./constant/typography";

export default function App() {
	const colorScheme = useColorScheme();

	const themeTextStyle =
		colorScheme === "light" ? styles.lightText : styles.darkText;

	const themeContainerStyle =
		colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

	return (
		<View style={[styles.container, themeContainerStyle]}>
			<Text style={[styles.text, themeTextStyle]}>Hello World!</Text>
			<StatusBar />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	text: {
		fontSize: Typography.h1.fontSize,
	},

	lightContainer: {
		backgroundColor: Colors.background.primary,
	},

	darkContainer: {
		backgroundColor: DarkColors.background.primary,
	},

	lightText: {
		color: Colors.text.primary,
	},

	darkText: {
		color: DarkColors.text.primary,
	},
});
