import React, {
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";

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

const pc_config = {
  iceServers: [
    {
      urls: "stun:localhost.com:4000",
    },
  ],
};

const constraints = {
  audio: true,
  video: false,
};

interface Props {
  socket: Socket.Socket;
}

interface StreamData {}
const LiverStream: FunctionComponent<Props> = ({ socket }) => {
  const [profileUsers, setProfileUsers] = useState<UserType[]>([]);
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const localStreamRef = useRef<MediaStream>();
  const [streamUsers, setStreamUsers] = useState<any[]>([]);
  let pcsRef = {};

  const getLocalStream = useCallback(async () => {
    let localStream = null;
    try {
      localStream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (err) {
      return;
    }

    localStreamRef.current = localStream;
    socket.emit("stream:join");
    if (localAudioRef.current) {
      localAudioRef.current.srcObject = localStream;
    }
  }, []);

  const createPeerConnection = useCallback((socketID) => {
    try {
      const pc = new RTCPeerConnection(pc_config);

      pc.onicecandidate = (e) => {
        if (!(socket && e.candidate)) return;
        socket.emit("stream:candidate", {
          candidate: e.candidate,
          candidateSendID: socket.id,
          candidateReceiveID: socketID,
        });
      };

      pc.ontrack = (e) => {
        setStreamUsers((oldUsers) =>
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
      } else {
        console.log("no local stream");
      }
      return pc;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }, []);

  useEffect(() => {
    socket.on("stream:initUsers", (userList) => {
      setProfileUsers(userList);
    });
    socket.on("stream:userJoin", (user) => {
      setProfileUsers([...profileUsers, user]);
    });
  }, []);

  useEffect(() => {
    socket.on("stream:initUsers", (userList) => {
      setProfileUsers(userList);
    });
    socket.on("stream:userJoin", (user) => {
      setProfileUsers([...profileUsers, user]);
    });

    getLocalStream();
    socket.on("stream:all_users", (allUsers) => {
      allUsers.forEach(async (userID: string) => {
        const pc = createPeerConnection(userID);
        if (!pc) return;
        pcsRef = { ...pcsRef, [userID]: pc };
        try {
          const localSdp = await pc.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: false,
          });
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          socket.emit("stream:offer", {
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

    const getOffer = async () => {};

    socket.on("stream:getOffer", async ({ sdp, offerSendID }) => {
      const pc = createPeerConnection(offerSendID);
      if (!pc) return;
      try {
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        const localSdp = await pc.createAnswer({
          offerToReceiveVideo: false,
          offerToReceiveAudio: true,
        });
        await pc.setLocalDescription(new RTCSessionDescription(localSdp));
        pcsRef = { ...pcsRef, [offerSendID]: pc };
        socket.emit("stream:answer", {
          sdp: localSdp,
          answerSendID: socket.id,
          answerReceiveID: offerSendID,
        });
      } catch (e) {
        console.error(e);
      }
    });

    socket.on("stream:getAnswer", ({ sdp, answerSendID }) => {
      const peer = pcsRef[answerSendID];
      if (!peer) return;
      peer.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    socket.on("stream:getCandidate", async ({ candidateSendID, candidate }) => {
      if (pcsRef[candidateSendID]) {
        const pc = pcsRef[candidateSendID];
        pc.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    socket.on("stream:user_exit", ({ id }) => {
      // if (!pcsRef.id) return;
      // pcsRef[id].close();
      // delete pcsRef.id;

      setStreamUsers((oldUsers) => oldUsers.filter((user) => user.id !== id));
      setProfileUsers((oldUsers) => {
        console.log("hello", oldUsers);
        return oldUsers.filter((user) => user.userId !== id);
      });
    });
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [createPeerConnection, getLocalStream]);

  const [myMute, setMyMute] = useState(false);

  return (
    <Styled.Container>
      <Styled.ProfileContainer>
        {profileUsers.map((data, idx) => {
          const { image, name } = data.user;
          return <StreamProfile name={name} profileUrl={image} key={idx} />;
        })}
      </Styled.ProfileContainer>

      {localStreamRef.current && (
        <Audio stream={localStreamRef.current} myMute={myMute} />
      )}

      {streamUsers.map((user, idx) => {
        {
          return <Audio stream={user.stream} myMute={false} key={idx} />;
        }
      })}
      <MuteButton setMyMute={setMyMute} myMute={myMute} />
    </Styled.Container>
  );
};

export default LiverStream;
