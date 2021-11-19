import React, { FunctionComponent, useEffect, useState, useRef } from "react";

import Peer from "simple-peer";
import * as Socket from "socket.io-client";

import { ProfileSummary } from "@src/components/molecules";
import mic from "./mic.svg";
import { Image } from "@src/components/atoms";
const Mike: FunctionComponent<{ socket: Socket.Socket }> = ({ socket }) => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState<MediaStream>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef<HTMLAudioElement>(null);
  const userVideo = useRef<HTMLAudioElement>(null);
  const connectionRef = useRef();

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current !== null) {
          myVideo.current.srcObject = stream;
        }
      });

    socket.on("init users", (initUsers) => {
      setUserList(Object.values(initUsers));
    });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      console.log("calling", data);
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
    socket.on("two", (id) => {
      if (me !== id) {
        setIdToCall(id);
      }
    });
    return () => {
      socket.emit("disconnect", "disconn");
      socket.disconnect();
    };
  }, []);

  const callUser = (id) => {
    console.log("calllllllll", id);
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
      if (userVideo.current !== null) {
        userVideo.current.srcObject = stream;
      }
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
      if (userVideo.current !== null) {
        userVideo.current.srcObject = stream;
      }
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
        <ul>
          {userList.map((elm) => {
            return (
              <li key={elm.userid}>
                <ProfileSummary
                  author={{
                    id: elm.userid,
                    profileUrl: elm.user.image,
                    score: 67,
                    username: elm.user.name,
                    __typename: "User",
                  }}
                />
              </li>
            );
          })}
        </ul>

        <div className="video">
          {stream && (
            <audio playsInline muted ref={myVideo} autoPlay width={300} />
          )}
          음소거
          <Image src={mic} type={"Large"} />
        </div>
        <div className="video">
          {callAccepted && !callEnded ? (
            <audio playsInline ref={userVideo} autoPlay width={300} />
          ) : null}
        </div>
        {callAccepted && !callEnded ? (
          <button onClick={leaveCall}>End Call</button>
        ) : (
          <button onClick={() => callUser(idToCall)}>calll</button>
        )}
        {receivingCall && !callAccepted ? (
          <div className="caller">
            <h1>통화하기</h1>
            <button onClick={answerCall}>통화</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Mike;
