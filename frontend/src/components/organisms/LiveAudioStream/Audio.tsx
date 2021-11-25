import React, { useState, useEffect, useRef } from "react";

export default function Audio({ stream }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = stream;
    }
  });

  return (
    <>
      <audio ref={ref} autoPlay></audio>
    </>
  );
}
