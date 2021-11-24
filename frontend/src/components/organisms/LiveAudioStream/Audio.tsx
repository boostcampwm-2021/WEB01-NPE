import React, { FunctionComponent, useEffect, useRef } from "react";

const Audio: FunctionComponent = ({ peer }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    peer.on("stream", (stream: MediaStream) => {
      if (audioRef.current) {
        audioRef.current.srcObject = stream;
      }
    });
  }, []);
  return <audio ref={audioRef} playsInline autoPlay />;
};

export default Audio;
