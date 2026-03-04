import {
	HankenGrotesk_400Regular,
	HankenGrotesk_500Medium,
	HankenGrotesk_700Bold,
	HankenGrotesk_700Bold_Italic,
	useFonts,
} from "@expo-google-fonts/hanken-grotesk";
import {
	DarkTheme,
	DefaultTheme,
	NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DictionaryProvider } from "./context/DictionaryContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { BottomTabs } from "./tabs/bottom/BottomTabs";

const Stack = createNativeStackNavigator();

const AppContent = () => {
	const { colors, isDark } = useTheme();

	return (
		<NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
			<View style={{ flex: 1, backgroundColor: colors.background.primary }}>
				<SafeAreaProvider>
					<StatusBar style={isDark ? "light" : "dark"} />
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name="MainTabs" component={BottomTabs} />
					</Stack.Navigator>
				</SafeAreaProvider>
			</View>
		</NavigationContainer>
	);
};

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
		<ThemeProvider>
			<DictionaryProvider>
				<AppContent />
			</DictionaryProvider>
		</ThemeProvider>
	);
}
