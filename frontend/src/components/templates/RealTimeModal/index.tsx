import React, { FunctionComponent, useRef, useState } from "react";
import * as Socket from "socket.io-client";
import { useSession } from "next-auth/client";

import * as Styled from "./styled";
import { Button } from "@components/atoms";
import { RealTimeEditor } from "@components/organisms";
import { QuestionDetailType } from "@src/types";
import ExitCheckModalWarpper from "@src/components/molecules/ExitCheckModalWapper";
import LiveChat from "@src/components/organisms/LiveChat";
import LiveStream from "@src/components/organisms/LiveAudioStream/";

const RealTimeModal: FunctionComponent<{
  question: QuestionDetailType;
  exitModal: VoidFunction;
  disconnectAndPostAnswer: VoidFunction;
  setCodeList: any;
}> = ({ question, exitModal, disconnectAndPostAnswer, setCodeList }) => {
  const [SOCKET, setSOCKET] = useState<Socket.Socket | null>(null);
  const [session] = useSession();

  if (!session || !session.accessToken) throw new Error("Auth Required");

  React.useEffect(() => {
    if (!SOCKET) {
      const token = session.accessToken;
      const socket = Socket.connect(
        process.env.NODE_ENV === "production"
          ? `https://nullpointerexception.ml`
          : `http://localhost:4000`,
        {
          path: "/socket",
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
        <Styled.ModalContenWrapper>
          <Styled.LeftTab>
            {SOCKET && <LiveStream socket={SOCKET} questionId={question.id} />}
            <Styled.ExitButtonWrapper>
              <Button
                type="realtime_exit"
                text="나가기"
                onClick={onExitClick}
              ></Button>
            </Styled.ExitButtonWrapper>
          </Styled.LeftTab>
          {SOCKET && (
            <RealTimeEditor
              question={question}
              socket={SOCKET}
              setCodeList={setCodeList}
            />
          )}
          {SOCKET && <LiveChat socket={SOCKET} />}
        </Styled.ModalContenWrapper>
        <ExitCheckModalWarpper
          question={question}
          disconnectAndExit={disconnectAndExit}
          disconnectAndPostAnswer={disconnectAndPostAnswer}
        />
      </Styled.Modal>
    </Styled.ModalWrapper>
  );
};

export default RealTimeModal;
