import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";

interface IPartOfSpeechProps {
    speech: Array<string>;
    onClick: (p: string) => void;
}

function PartOfSpeech(props: IPartOfSpeechProps) {
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "partOfSpeech",
        defaultValue: props.speech[0],
        onChange: props.onClick
    });
    const group = getRootProps();

    return (
        <HStack {...group}>
            {
                props.speech.map((value) => {
                    const radio = getRadioProps({ value });
                    return (
                        <RadioCard key={value} {...radio}>
                            {value}
                        </RadioCard>
                    )
                })
            }
        </HStack>
    );
}

function RadioCard(props: React.AriaAttributes & React.DOMAttributes<HTMLInputElement> & {
    id?: string | undefined;
    role?: React.AriaRole | undefined;
    tabIndex?: number | undefined;
    style?: React.CSSProperties | undefined;
}) {
    const { getInputProps, getRadioProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getRadioProps();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                _checked={{
                    bg: "teal.600",
                    color: "white",
                    borderColor: "teal.600",
                }}
                _focus={{
                    boxShadow: "outline",
                }}
                px={2}
            >
                {props.children}
            </Box>
        </Box>
    );
}

export default PartOfSpeech;
