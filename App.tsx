import {
	HankenGrotesk_400Regular,
	HankenGrotesk_500Medium,
	HankenGrotesk_700Bold,
	HankenGrotesk_700Bold_Italic,
	useFonts,
} from "@expo-google-fonts/hanken-grotesk";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Colors, DarkColors } from "./constant/colors";
import { Typography } from "./constant/typography";

export default function App() {
	const colorScheme = useColorScheme();

	const [fontLoaded] = useFonts({
		HankenGrotesk_400Regular,
		HankenGrotesk_500Medium,
		HankenGrotesk_700Bold,
		HankenGrotesk_700Bold_Italic,
	});

	useEffect(() => {
		if (fontLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontLoaded]);

	if (!fontLoaded) return null;

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
		fontSize: Typography.h2.fontSize,
		fontFamily: Typography.h2.fontFamily,
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
