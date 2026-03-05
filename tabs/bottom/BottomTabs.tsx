import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../../constant/colors";
import { Typography } from "../../constant/typography";
import { useTheme } from "../../context/ThemeContext";
import { HomeScreen } from "../../screens/HomeScreen";
import { SaveWordsScreen } from "../../screens/SaveWordsScreen";

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
	const { colors, isDark } = useTheme();

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarLabelStyle: {
					fontSize: Typography.meaning.fontSize,
					fontFamily: Typography.meaning.fontFamily,
					marginBottom: 2,
				},
				tabBarActiveTintColor: colors.text.tertiary,
				tabBarInactiveTintColor: colors.text.secondary,
				tabBarStyle: {
					backgroundColor: colors.background.primary,
					borderTopColor: isDark ? Colors.neutral800 : Colors.neutral200,
				},
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons
							name={focused ? "home" : "home-outline"}
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Words"
				component={SaveWordsScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons
							name={focused ? "bookmark" : "bookmark-outline"}
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};
