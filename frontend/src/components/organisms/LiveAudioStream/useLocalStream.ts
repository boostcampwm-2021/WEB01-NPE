import { useEffect, useMemo, useRef } from "react";

const useLocalStream = () => {
  const localAudioRef = useRef();
  useEffect(() => {
    return () => {};
  }, []);
  return [localAudioRef];
};

export default useLocalStream;
