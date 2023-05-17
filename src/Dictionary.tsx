//@ts-nocheck
import { useState } from "react";
import {
    Box,
    Button,
    Container,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    ListItem,
    OrderedList,
    SimpleGrid,
    Text,
    UnorderedList,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Audio from "./components/Audio";
import PartOfSpeech from "./components/PartOfSpeech";
import { keyBy } from "lodash";

interface FormattedData {
    phonetics: Array<string>;
    audio: Array<string>;
    word: string;
    partOfSpeech: Array<string>;
    meanings: Record<string, object>;
}

function formatData(data: string | any[]) {
    if(data.length === 0) {
        return [];
    } else if(data.length > 0 && data[0]) {
        const formattedData: FormattedData = {
            phonetics: [],
            audio: [],
            word: data[0].word,
            partOfSpeech: [],
            meanings: {},
        };

        data[0].phonetics.forEach(
            ({ audio, text }: { audio: string; text: string }) => {
                if(audio) {
                    formattedData.audio.push(audio);
                }
                if(text) {
                    formattedData.phonetics.push(text);
                }
            }
        );
        data[0].meanings.forEach(({ partOfSpeech }: { partOfSpeech: string }) => {
            if(!formattedData.partOfSpeech.includes(partOfSpeech)) {
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

    const handleChange = (event: Event) => {
        setSearchTerm(event?.target?.value);
    };

    const handleSubmit = async(event: Event) => {
        event.preventDefault();
        if(searchResults.length > 0 && searchResults[0].word === searchTerm) {
            return;
        }
        const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
        );
        const data = await response.json();
        const formattedData = formatData(data);
        setSearchResults(formattedData);
        setCurrentPartOfSpeech(formattedData[0].partOfSpeech[0]);
    };

    const onPartOfSpeechHandler = (selectedPartOfSpeech: string) => {
        setCurrentPartOfSpeech(selectedPartOfSpeech);
    };

    console.log(searchResults);
    const meaning = searchResults[0]?.meanings?.[currentPartOfSpeech];
    console.log({ meaning });

    return (
        <Container maxW="container.md" py={8}>
            <Box my={8}>
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<SearchIcon color="gray.300"/>}
                        />
                        <Input
                            type="text"
                            placeholder="Search for a word"
                            value={searchTerm}
                            onChange={handleChange}
                            autoFocus={true}
                        />
                        <Button type="submit" colorScheme="teal">
                            Search
                        </Button>
                    </InputGroup>
                </form>
            </Box>
            {searchResults.length > 0 && (
                <Box>
                    {searchResults.map((result, index) => (
                        <Box key={index} my={8}>
                            <Heading as="h2" size="lg">
                                {result.word}
                            </Heading>
                            <Box key={index} mb={4}>
                                <Text color="teal" mb={2}>
                                    {result.phonetics.join(", ")}
                                    <Audio audio={result.audio}/>
                                </Text>
                            </Box>
                            <Box key={index} my={4}>
                                <PartOfSpeech
                                    speech={result.partOfSpeech}
                                    onClick={onPartOfSpeechHandler}
                                />
                            </Box>
                            <Box my={4}>
                                <Text>{result.origin}</Text>
                            </Box>
                            <Box my={4}>
                                <Heading color="teal" as="h5" size="sm" className="uppercase">
                                    Definitions <span
                                    className="text-gray-500 text-sm">{meaning.definitions.length}</span>
                                </Heading>
                                <OrderedList mb={5}>
                                    {meaning.definitions.map(({ definition }, index) => (
                                        <ListItem key={index}>
                                            {definition}
                                        </ListItem>
                                    ))}
                                </OrderedList>
                                <SimpleGrid columns={2}>
                                    <Heading color="teal" as="h5" size="sm" className="uppercase">
                                        Synonyms <span
                                        className="text-gray-500 text-sm">{meaning.synonyms.length}</span>
                                    </Heading>
                                    <Heading color="teal" as="h5" size="sm" className="uppercase">
                                        Antonyms <span
                                        className="text-gray-500 text-sm">{meaning.antonyms.length}</span>
                                    </Heading>
                                    <UnorderedList styleType="none">
                                        {meaning.synonyms.map((synonym, index) => (
                                            <ListItem key={index}>
                                                {synonym}
                                            </ListItem>
                                        ))}
                                    </UnorderedList>
                                    <UnorderedList styleType="none">
                                        {meaning.antonyms.map((antonyms, index) => (
                                            <ListItem key={index}>
                                                {antonyms}
                                            </ListItem>
                                        ))}
                                    </UnorderedList>
                                </SimpleGrid>
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </Container>
    );
}

export default Dictionary;
