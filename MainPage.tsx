import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pronunciation } from "./components/pronunciation/Pronunciation";
import { Search } from "./components/search/Search";
import { Spacing } from "./constant/spacing";

export const MainPage = () => {
	const [search, setSearch] = useState("Keyboard");

	const handleSearch = () => {};

	return (
		<SafeAreaView style={styles.container}>
			<Search value={search} onChangeText={setSearch} onPress={handleSearch} />
			<Pronunciation word={search} pronunciation="/ˈkiːbɔːd/" />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: Spacing.spacing300,
		paddingRight: Spacing.spacing300,
		gap: Spacing.spacing400,
	},
});
