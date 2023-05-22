import { Box, Heading, ListItem, OrderedList, SimpleGrid, Text, UnorderedList } from "@chakra-ui/react";
import Audio from "./Audio";
import PartOfSpeech from "./PartOfSpeech";
import { FormattedData } from "../Dictionary";

interface IResultProps {
    isSearching: boolean;
    searchResults: Array<FormattedData>;
    onPartOfSpeechHandler: (selectedPartOfSpeech: string) => void;
    currentPartOfSpeech: string
}

function Result(props: IResultProps) {
    const { isSearching, searchResults, onPartOfSpeechHandler, currentPartOfSpeech } = props;

    if(isSearching || searchResults.length === 0) {
        return null;

    }
    const meaning = searchResults[0]?.meanings?.[currentPartOfSpeech];

    return (
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
                                className="text-gray-500 text-sm">{meaning.synonyms?.length}</span>
                            </Heading>
                            <Heading color="teal" as="h5" size="sm" className="uppercase">
                                Antonyms <span
                                className="text-gray-500 text-sm">{meaning.antonyms?.length}</span>
                            </Heading>
                            <UnorderedList styleType="none">
                                {meaning.synonyms?.map((synonym, index) => (
                                    <ListItem key={index}>
                                        {synonym}
                                    </ListItem>
                                ))}
                            </UnorderedList>
                            <UnorderedList styleType="none">
                                {meaning.antonyms?.map((antonyms, index) => (
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
    )
}

export default Result;
