export type Definition = {
	definition: string;
	example?: string;
};

export type Meaning = {
	partOfSpeech: string;
	definition: Definition[];
};

export type Phonetic = {
	text: string;
	audio: string;
};

export type DictionaryEntry = {
	word: string;
	phonetic?: string;
	phonetics: Phonetic[];
	meanings: Meaning[];
	sourceUrls: string[];
};
