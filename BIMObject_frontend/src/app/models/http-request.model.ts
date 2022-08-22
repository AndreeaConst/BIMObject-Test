export interface HttpRequest {
    word?: string;
    results?: Result[];
    pronounciation?: string;
    frequency?: number;
    syllables?: Syllables;
}

export interface Result {
    definition?: string;
    partOfSpeech?: string;
    synonyms?: string[];
    typeOf?: string[];
}

export interface Syllables {
    count?: number;
    list?: string[];
}