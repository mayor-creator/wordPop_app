import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "./components/search/Search";
import { PlayButton } from "./components/ui/PlayButton";

export const MainPage = () => {
	const [search, setSearch] = useState("Keyboard");

	const handleSearch = () => {};

	return (
		<SafeAreaView style={styles.container}>
			<Search value={search} onChangeText={setSearch} onPress={handleSearch} />
			<PlayButton onPress={() => console.log("Play")} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 24,
		paddingRight: 24,
	},
});
