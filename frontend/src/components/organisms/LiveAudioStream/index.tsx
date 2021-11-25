import React, { useState, useRef, useEffect, useCallback } from "react";
import { Container } from "./styled";
import Audio from "./Audio";
import StreamProfile from "./StreamProfile";
import { Socket } from "socket.io-client";

import * as Styled from "./styled";

export default function LiveAudioStream({ socket }: { socket: Socket }) {
  const pcsRef = useRef({});
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const localStreamRef = useRef<MediaStream>(null);
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState<{ [socketId: string]: any }>({});

  const getLocalStream = useCallback(async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      localStreamRef.current = localStream;
      socket.emit("join");
      if (localAudioRef.current) {
        localAudioRef.current.srcObject = localStreamRef.current;
      }
      if (!socket) return;
    } catch (e) {
      console.log(`getUserMedia error: ${e}`);
    }
  }, []);

  const createPeerConnection = useCallback((socketID) => {
    try {
      const pc = new RTCPeerConnection(pc_config);
      pc.onicecandidate = (e) => {
        if (!(socket && e.candidate)) return;
        socket.emit("candidate", {
          candidate: e.candidate,
          candidateSendID: socket.id,
          candidateReceiveID: socketID,
        });
      };

      pc.ontrack = (e) => {
        setUsers((oldUsers) =>
          oldUsers
            .filter((user) => user.id !== socketID)
            .concat({
              id: socketID,
              stream: e.streams[0],
            })
        );
      };

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          if (!localStreamRef.current) return;
          pc.addTrack(track, localStreamRef.current);
        });
      }
      return pc;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }, []);

  useEffect(() => {
    socket.on("user join", ([socketId, user]) => {
      const newUser = {};
      newUser[socketId] = user;
      setProfiles((prevUsers) => {
        return {
          ...prevUsers,
          ...newUser,
        };
      });
    });
    socket.on("user exit", ([socketId, name]) => {
      setProfiles((prevUsers) => {
        Object.keys(prevUsers).forEach((key) => {
          if (key === socketId) {
            delete prevUsers[key];
          }
        });
        return {
          ...prevUsers,
        };
      });
    });
    socket.on("init users", (initUsers) => {
      setProfiles((prevUsers) => {
        return {
          ...prevUsers,
          ...initUsers,
        };
      });
    });
  }, []);

  useEffect(() => {
    getLocalStream();
    socket.on("all_users", (allUsers) => {
      allUsers.forEach(async (userID) => {
        if (!localStreamRef.current) return;
        const pc = createPeerConnection(userID);
        if (!(pc && socket)) return;
        pcsRef.current = { ...pcsRef.current, [userID]: pc };
        try {
          const localSdp = await pc.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: false,
          });
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          socket.emit("offer", {
            sdp: localSdp,
            offerSendID: socket.id,
            offerSendEmail: "offerSendSample@sample.com",
            offerReceiveID: userID,
          });
        } catch (e) {
          console.error(e);
        }
      });
    });

    socket.on("getOffer", async (data) => {
      const { sdp, offerSendID } = data;
      if (!localStreamRef.current) return;
      const pc = createPeerConnection(offerSendID);
      if (!(pc && socket)) return;
      pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        const localSdp = await pc.createAnswer({
          offerToReceiveVideo: false,
          offerToReceiveAudio: true,
        });
        await pc.setLocalDescription(new RTCSessionDescription(localSdp));
        socket.emit("answer", {
          sdp: localSdp,
          answerSendID: socket.id,
          answerReceiveID: offerSendID,
        });
      } catch (e) {
        console.error(e);
      }
    });

    socket.on("getAnswer", (data) => {
      const { sdp, answerSendID } = data;
      const pc = pcsRef.current[answerSendID];
      if (!pc) return;
      pc.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    socket.on("getCandidate", async (data) => {
      const pc = pcsRef.current[data.candidateSendID];
      if (!pc) return;
      await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
    });

    socket.on("user_exit", (data) => {
      if (!pcsRef.current[data.id]) return;
      pcsRef.current[data.id].close();
      delete pcsRef.current[data.id];
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(function (track) {
          if (track.readyState == "live") {
            track.stop();
          }
        });
      }
      if (localAudioRef.current) {
        localAudioRef.current.pause();
      }
      users.forEach((user) => {
        if (!pcsRef.current[user.id]) return;
        pcsRef.current[user.id].close();
        delete pcsRef.current[user.id];
      });
    };
  }, [createPeerConnection, getLocalStream]);

  return (
    <Container>
      <Styled.ProfileContainer>
        {Object.values(profiles).map((elm, idx) => {
          const name = elm.user.name;
          const profileUrl = elm.user.image;
          return (
            <StreamProfile name={name} profileUrl={profileUrl} key={idx} />
          );
        })}
      </Styled.ProfileContainer>
      <audio muted ref={localAudioRef} autoPlay />
      {users.map((user, index) => (
        <Audio key={index} stream={user.stream} />
      ))}
    </Container>
  );
}

const pc_config = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};
