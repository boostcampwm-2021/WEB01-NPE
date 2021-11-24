import React, {
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";

import Peer from "simple-peer";
import * as Socket from "socket.io-client";
import * as Styled from "./styled";
import StreamProfile from "./StreamProfile";
import Audio from "./Audio";
import MuteButton from "./MuteButton";

interface UserType {
  userId: number;
  user: {
    name: string;
    image: string;
  };
  expires: string;
}

interface Props {
  socket: Socket.Socket;
  questionId: string;
}

const LiverStream: FunctionComponent<Props> = ({ socket, questionId }) => {
  const [profileUsers, setProfileUsers] = useState([]);
  const localAudioRef = useRef<HTMLVideoElement>(null);
  const peersRef = useRef<{ peerID: any; peer: any }[]>([]);
  const [peers, setPeers] = useState<any[]>([]);

  const addPeer = (
    incomingSignal: any,
    callerId: string,
    stream: MediaStream
  ) => {
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (signal) => {
      socket.emit("stream:returningSignal", { signal, callerId });
    });
    peer.signal(incomingSignal);
    return peer;
  };
  const createPeer = (
    userToSiganl: any,
    callerId: string,
    stream: MediaStream
  ) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    peer.on("signal", (signal) => {
      socket.emit("stream:sendingSignal", { userToSiganl, callerId, signal });
    });
    return peer;
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: { width: 150, height: 100 },
      })
      .then((localStream) => {
        localStream.getAudioTracks()[0].enabled = false;
        if (localAudioRef.current) {
          localAudioRef.current.srcObject = localStream;
        }

        socket.emit("stream:join", { questionId });
        socket.on("stream:allUsers", (users) => {
          if (users.length === 0) return;
          const _peers: any = [];
          users.forEach((userId: string) => {
            const peer = createPeer(userId, socket.id, localStream);
            peersRef.current.push({
              peerID: userId,
              peer,
            });
            _peers.push(peer);
          });
          setPeers(_peers);
        });

        socket.on("stream:userJoin", (payload) => {
          const peer = addPeer(payload.signal, payload.callerId, localStream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });
          setPeers([...peers, peer]);
        });

        socket.on("stream:exit", (socketId) => {
          const newPeers = peers.filter((id) => id !== socketId);
          setPeers(newPeers);

          const newProfileUsers = profileUsers.filter(
            (user) => user.userId !== socketId
          );

          setProfileUsers(newProfileUsers);
        });

        socket.on("stream:recevingReturnSignal", (payload) => {
          const item = peersRef.current.find((p) => (p.peerID = payload.id));
          if (item) {
            item.peer.signal(payload.signal);
          }
        });
      });
  }, []);

  useEffect(() => {
    socket.on("init users", (users) => {
      setProfileUsers(users);
    });
    socket.on("user join", ([socketId, user]) => {
      setProfileUsers([...profileUsers, user]);
    });
    return () => {};
  }, []);

  return (
    <Styled.Container>
      {/* <Styled.ProfileContainer>
        {profileUsers.length >= 1 &&
          profileUsers.map((data, idx) => {
            return (
              <StreamProfile
                name={"test"}
                profileUrl={"https://avatars.githubusercontent.com/u/67536413"}
                key={idx}
              />
            );
          })} */}
      {/* </Styled.ProfileContainer> */}

      <Styled.PeerVideoContainer>
        <video
          ref={localAudioRef}
          muted={true}
          autoPlay
          width={150}
          height={100}
        />
        {peers.map((peer, index) => {
          return <Audio key={index} peer={peer} />;
        })}
      </Styled.PeerVideoContainer>
    </Styled.Container>
  );
};

export default LiverStream;
