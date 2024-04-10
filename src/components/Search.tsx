import { Box, Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { ChangeEvent, FormEvent } from "react";

interface ISearchProps {
    handleSubmit: (e: FormEvent) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isSearching: boolean;
    searchTerm: string;
}

function Search(props: ISearchProps) {
    const { handleSubmit, isSearching, searchTerm, handleChange } = props;

    return <Box my={8}>
        <form onSubmit={handleSubmit}>
            <InputGroup className="flex-col gap-4 md:flex-row">
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                />
                <Input
                    type="text"
                    placeholder="Search for a word"
                    value={searchTerm}
                    onChange={handleChange}
                    autoFocus={true}
                />
                <Button type="submit" colorScheme="teal" isLoading={isSearching} disabled={isSearching}
                    loadingText="Search">
                    Search
                </Button>
            </InputGroup>
        </form>
    </Box>;
}

export default Search;
