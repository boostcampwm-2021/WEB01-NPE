import React, { FunctionComponent, useEffect, useState, useRef } from "react";

import * as Styled from "./styled";
import Peer from "simple-peer";
import * as Socket from "socket.io-client";

import { ProfileSummary } from "@src/components/molecules";

const Mike: FunctionComponent<{ socket: Socket.Socket }> = ({ socket }) => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <div>
      <div className="video-container">
        <ProfileSummary
          author={{
            id: "1",
            profileUrl: "https://i.ibb.co/xYL9LwZ/image.png",
            score: 67,
            username: "username_1",
            __typename: "User",
          }}
        />
        <ProfileSummary
          author={{
            id: "2",
            profileUrl: "https://i.ibb.co/xYL9LwZ/image.png",
            score: 67,
            username: "username_1",
            __typename: "User",
          }}
        />
        <div className="video">
          {stream && <audio playsInline muted ref={myVideo} autoPlay />}
        </div>
        <div className="video">
          {callAccepted && !callEnded ? (
            <audio playsInline ref={userVideo} autoPlay />
          ) : null}
        </div>
        <input value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
        {callAccepted && !callEnded ? (
          <button onClick={leaveCall}>End Call</button>
        ) : (
          <button onClick={() => callUser(idToCall)}>calll</button>
        )}
        {idToCall}
        <div>{me}</div>
        {receivingCall && !callAccepted ? (
          <div className="caller">
            <h1>{name} is calling...</h1>
            <button onClick={answerCall}>Answer</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Mike;
