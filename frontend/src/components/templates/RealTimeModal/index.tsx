import React, { FunctionComponent, useState } from "react";
import * as Socket from "socket.io-client";

import * as Styled from "./styled";
import { Button, Logo, TitleText, Text, ContentText } from "@components/atoms";
import { RealTimeEditor } from "@components/organisms";
import { QuestionDetailType } from "@src/types";
import { useSession } from "next-auth/client";
import ExitCheckModalWarpper from "@src/components/molecules/ExitCheckModalWapper";
import LiveChat from "@src/components/organisms/LiveChat";
import Mike from "@src/components/organisms/Mike";

const RealTimeModal: FunctionComponent<{
  question: QuestionDetailType;
  exitModal: VoidFunction;
}> = ({ question, exitModal }) => {
  const [SOCKET, setSOCKET] = useState<Socket.Socket | null>(null);
  const [session] = useSession();
  console.log(session);
  if (!session || !session.accessToken) throw new Error("Auth Required");

  React.useEffect(() => {
    if (!SOCKET) {
      const token = session.accessToken;
      const socket = Socket.connect(
        process.env.NODE_ENV === "production"
          ? `http://118.67.142.132:4000`
          : `http://localhost:4000/`,
        {
          auth: { token },
        }
      );
      socket.emit("joinRoom", {
        questionId: question.id,
      });
      setSOCKET(socket);
    }
  });

  const onExitClick = () => {
    const exitModalDiv = document.getElementById("exitModal");
    exitModalDiv!.style.visibility = "visible";
  };

  const disconnectAndExit = () => {
    SOCKET?.disconnect();
    exitModal();
  };

  return (
    <Styled.ModalWrapper>
      <Styled.Modal>
        <Styled.temp>
          {SOCKET && <Mike socket={SOCKET} />}
          {SOCKET && <RealTimeEditor question={question} socket={SOCKET} />}
          {SOCKET && <LiveChat socket={SOCKET} />}
        </Styled.temp>
        <Button
          type="realtime_exit"
          text="나가기"
          onClick={onExitClick}
        ></Button>
        <ExitCheckModalWarpper
          question={question}
          disconnectAndExit={disconnectAndExit}
        />
      </Styled.Modal>
    </Styled.ModalWrapper>
  );
};

export default RealTimeModal;
