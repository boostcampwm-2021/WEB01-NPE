import React, { FunctionComponent, useEffect, useRef } from "react";

interface Props {
  stream: MediaStream;
  myMute: boolean;
}
const Audio: FunctionComponent<Props> = ({ stream, myMute }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.srcObject = stream;
    }
  });
  return <audio ref={audioRef} autoPlay muted={myMute} />;
};

export default Audio;
