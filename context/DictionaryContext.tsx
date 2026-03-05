import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	createContext,
	type ReactNode,
	useCallback,
	useEffect,
	useState,
} from "react";
import type { DictionaryEntry } from "../types/types";

type DictionaryContextType = {
	data: DictionaryEntry[] | null;
	fetchWord: (word: string) => Promise<void>;
	savedWords: DictionaryEntry[];
	saveWord: () => Promise<void>;
	removeWord: (word: string) => Promise<void>;
	loadSavedWords: () => Promise<void>;
};

export const DictionaryContext = createContext<DictionaryContextType | null>(
	null,
);

type Props = {
	children: ReactNode;
};

const STORAGE_KEY = "@saved_words";

export const DictionaryProvider = ({ children }: Props) => {
	const [data, setData] = useState<DictionaryEntry[] | null>(null);
	const [savedWords, setSavedWords] = useState<DictionaryEntry[]>([]);

	const fetchWord = useCallback(async (word: string) => {
		try {
			const response = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
			);
			const result: DictionaryEntry[] = await response.json();
			setData(result);
		} catch (error) {
			console.log("Error fetching word:", error);
		}
	}, []);

	const saveWord = useCallback(async () => {
		if (!data || data.length === 0) return;

		try {
			const updatedWords = [...savedWords, ...data];
			setSavedWords(updatedWords);
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWords));
		} catch (error) {
			console.log("Error saving word:", error);
		}
	}, [data, savedWords]);

	const loadSavedWords = useCallback(async () => {
		try {
			const storedWords = await AsyncStorage.getItem(STORAGE_KEY);

			if (storedWords) {
				setSavedWords(JSON.parse(storedWords));
			}
		} catch (error) {
			console.log("Error loading saved words:", error);
		}
	}, []);

	useEffect(() => {
		loadSavedWords();
	}, [loadSavedWords]);

	const removeWord = async (word: string) => {
		try {
			const filtered = savedWords.filter((entry) => entry.word !== word);

			setSavedWords(filtered);

			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
		} catch (error) {
			console.log("Error removing word:", error);
		}
	};

	const values = {
		data,
		fetchWord,
		saveWord,
		savedWords,
		loadSavedWords,
		removeWord,
	};

	return (
		<DictionaryContext.Provider value={values}>
			{children}
		</DictionaryContext.Provider>
	);
};
