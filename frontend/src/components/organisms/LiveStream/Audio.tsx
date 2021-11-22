import React, { useEffect, useRef, useState } from "react";
import { StyledVideo } from "./style";
export default function Audio(props) {
  const { stream, muted } = props;
  const ref = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
    if (muted) setIsMuted(muted);
  });

  return <StyledVideo ref={ref} muted={isMuted} autoPlay></StyledVideo>;
}
