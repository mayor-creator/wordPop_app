import { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { Colors, DarkColors } from "../constant/colors";

const lightTheme = {
	...Colors,
	card: Colors.neutral100,
};

const darkTheme = {
	...DarkColors,
	card: Colors.neutral900,
};

type ThemeColors = typeof lightTheme;

type ThemeContextType = {
	isDark: boolean;
	colors: ThemeColors;
};

const ThemeContext = createContext<ThemeContextType>({
	isDark: false,
	colors: lightTheme,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [isDark, setIsDark] = useState(Appearance.getColorScheme() === "dark");

	useEffect(() => {
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			setIsDark(colorScheme === "dark");
		});
		return () => subscription.remove();
	}, []);

	return (
		<ThemeContext.Provider
			value={{ isDark, colors: isDark ? darkTheme : lightTheme }}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
