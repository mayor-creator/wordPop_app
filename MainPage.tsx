import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Definitions } from "./components/definition/Definition";
import { Pronunciation } from "./components/pronunciation/Pronunciation";
import { Search } from "./components/search/Search";
import { SaveButton } from "./components/ui/SaveButton";
import { Spacing } from "./constant/spacing";
import { DictionaryContext } from "./context/DictionaryContext";

export const MainPage = () => {
	const context = useContext(DictionaryContext);
	const [search, setSearch] = useState("Keyboard");

	if (!context) return null;
	const { data, fetchWord } = context;

	const audioSource = data?.[0]?.phonetics.find((p) => p.audio)?.audio;

	// load default word when the screen opens
	// biome-ignore lint/correctness/useHookAtTopLevel: <explanation>
	useEffect(() => {
		fetchWord("Keyboard");
	}, [fetchWord]);

	const handleSearch = () => {
		if (!search.trim()) return;
		fetchWord(search.toLowerCase());
	};

	return (
		<SafeAreaView style={styles.container}>
			<Search
				value={search}
				onChangeText={setSearch}
				onPress={handleSearch}
				onSubmitEditing={handleSearch}
			/>

			{data?.[0] && (
				<Pronunciation
					word={data?.[0]?.word}
					pronunciation={data?.[0]?.phonetic ?? ""}
					audioUrl={audioSource}
				/>
			)}

			<ScrollView>
				{data?.[0]?.meanings && <Definitions meanings={data[0].meanings} />}
			</ScrollView>

			<SaveButton />
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
