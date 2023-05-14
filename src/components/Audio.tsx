import { IconButton } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { GiSpeaker } from "react-icons/gi";

interface IAudioProps {
  audio: Array<string>;
}

function Audio(props: IAudioProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const onClickHandler = () => {
    if(audioRef.current) {
        audioRef.current.play();
    }
  };
  const { audio } = props;
  if (audio.length === 0) {
    return null;
  }

  return (
    <>
      <audio src={audio[0]} ref={audioRef} />
      <IconButton
        onClick={onClickHandler}
        variant="link"
        colorScheme="teal"
        aria-label="Play"
        fontSize="18px"
        size="sm"
        icon={<GiSpeaker />}
        verticalAlign={"middle"}
      />
    </>
  );
}

export default Audio;
