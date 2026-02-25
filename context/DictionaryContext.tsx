import { createContext, type ReactNode, useState } from "react";
import type { DictionaryEntry } from "../types/types";

type DictionaryContextType = {
	data: DictionaryEntry[] | null;
	fetchWord: (word: string) => Promise<void>;
};

export const DictionaryContext = createContext<DictionaryContextType | null>(
	null,
);

type Props = {
	children: ReactNode;
};

export const DictionaryProvider = ({ children }: Props) => {
	const [data, setData] = useState<DictionaryEntry[] | null>(null);

	const fetchWord = async (word: string) => {
		try {
			const response = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
			);
			const result: DictionaryEntry[] = await response.json();
			setData(result);
		} catch (error) {
			console.log("Error fetching word:", error);
		}
	};

	const values = { data, fetchWord };

	return (
		<DictionaryContext.Provider value={values}>
			{children}
		</DictionaryContext.Provider>
	);
};
