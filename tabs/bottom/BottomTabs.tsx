import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Typography } from "../../constant/typography";
import { HomeScreen } from "../../screens/HomeScreen";
import { SaveWordsScreen } from "../../screens/SaveWordsScreen";

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarLabelStyle: {
					fontSize: Typography.meaning.fontSize,
					fontFamily: Typography.meaning.fontFamily,
				},
				tabBarActiveTintColor: "#000",
				tabBarInactiveTintColor: "gray",
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
				name="SaveWords"
				component={SaveWordsScreen}
				options={{
					tabBarIcon: ({ focused, color, size }) => (
						<Ionicons
							name={focused ? "save" : "save-outline"}
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};
