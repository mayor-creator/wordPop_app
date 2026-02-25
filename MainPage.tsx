import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pronunciation } from "./components/pronunciation/Pronunciation";
import { Search } from "./components/search/Search";
import { Spacing } from "./constant/spacing";
import { DictionaryContext } from "./context/DictionaryContext";

export const MainPage = () => {
	const context = useContext(DictionaryContext);
	const [search, setSearch] = useState("Keyboard");

	if (!context) return null;

	useEffect(() => {
		fetchWord(search);
	}, [search]);

	const handleSearch = () => {
		fetchWord(search);
	};

	const { data, fetchWord } = context;

	return (
		<SafeAreaView style={styles.container}>
			<Search value={search} onChangeText={setSearch} onPress={handleSearch} />
			<Pronunciation
				word={data?.[0]?.word}
				pronunciation={data?.[0]?.phonetic}
			/>
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
