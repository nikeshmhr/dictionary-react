import { ChangeEvent, FormEvent, useState } from "react";
import { Container, Skeleton, } from "@chakra-ui/react";
import keyBy from "lodash/keyBy";
import Search from "./components/Search";
import Result from "./components/Result";

interface DefinitionsEntity {
    definition: string;
    synonyms: Array<void>;
    antonyms: Array<void>;
}
interface Meaning {
    partOfSpeech: string;
    definitions: Array<DefinitionsEntity>;
    synonyms?: Array<string>;
    antonyms?: Array<string>;
}
export interface FormattedData {
    phonetics: Array<string>;
    audio: Array<string>;
    word: string;
    partOfSpeech: Array<string>;
    meanings: Record<string, Meaning>;
    origin?: string;
}

function formatData(data: Array<any>) {
    if (data.length === 0) {
        return [];
    } else if (data.length > 0 && data[0]) {
        const formattedData: FormattedData = {
            phonetics: [],
            audio: [],
            word: data[0].word,
            partOfSpeech: [],
            meanings: {},
        };

        data[0].phonetics.forEach(
            ({ audio, text }: { audio: string; text: string }) => {
                if (audio) {
                    formattedData.audio.push(audio);
                }
                if (text) {
                    formattedData.phonetics.push(text);
                }
            }
        );
        data[0].meanings.forEach(({ partOfSpeech }: { partOfSpeech: string }) => {
            if (!formattedData.partOfSpeech.includes(partOfSpeech)) {
                formattedData.partOfSpeech.push(partOfSpeech);
            }
        });

        formattedData.meanings = keyBy(data[0].meanings, "partOfSpeech");
        return [formattedData];
    }
}

function Dictionary() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<any>([]);
    const [currentPartOfSpeech, setCurrentPartOfSpeech] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event?.target?.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (searchResults.length > 0 && (searchResults[0].word === searchTerm || isSearching)) {
            return;
        }
        try {
            setIsSearching(true);
            const response = await fetch(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
            );
            const data = await response.json();
            const formattedData = formatData(data) ?? [];
            setSearchResults(formattedData);
            setCurrentPartOfSpeech(formattedData[0].partOfSpeech[0]);
        } catch (err) {
            setSearchResults([]);
            console.error("API ERROR");
        } finally {
            setIsSearching(false);
        }
    };

    const onPartOfSpeechHandler = (selectedPartOfSpeech: string) => {
        setCurrentPartOfSpeech(selectedPartOfSpeech);
    };

    return (
        <Container maxW="container.md" py={8}>
            <Search isSearching={isSearching} searchTerm={searchTerm} handleChange={handleChange}
                handleSubmit={handleSubmit} />
            {
                isSearching ? <Skeleton height="container.sm" /> :
                    <Result searchResults={searchResults} isSearching={isSearching}
                        onPartOfSpeechHandler={onPartOfSpeechHandler} currentPartOfSpeech={currentPartOfSpeech} />
            }
        </Container>
    );
}

export default Dictionary;
