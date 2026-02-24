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
import { View } from "react-native";

import { MainPage } from "./MainPage";

export default function App() {
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

	return (
		<View>
			<StatusBar />
			<MainPage />
		</View>
	);
}
