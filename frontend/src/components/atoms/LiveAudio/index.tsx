import React, { useEffect, useRef, FunctionComponent } from "react";

interface Props {
  stream: MediaStream;
}

const LiveAudio: FunctionComponent<Props> = ({ stream }) => {
  const ref = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  });

  return <audio ref={ref} autoPlay></audio>;
};

export default LiveAudio;
