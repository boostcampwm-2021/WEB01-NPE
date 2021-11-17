import React, { FunctionComponent } from "react";
import * as Socket from "socket.io-client";

import * as Styled from "./styled";
import { Button, Logo, TitleText, Text } from "@components/atoms";
import { RealTimeEditor } from "@components/organisms";
import { QuestionDetailType } from "@src/types";
import { useSession } from "next-auth/client";

const RealTimeModal: FunctionComponent<{ question: QuestionDetailType }> = ({
  question,
}) => {
  let socket: Socket.Socket;
  const [session] = useSession();
  if (!session || !session.accessToken) throw new Error("Auth Required");

  React.useEffect(() => {
    const token = session.accessToken;
    socket = Socket.connect("http://localhost:4000/", {
      auth: { token },
    });
    socket.emit("joinRoom", {
      questionId: question.id,
    });
    return () => {
      socket.disconnect();
    };
  });

  const yjssocket = "?";

  return (
    <Styled.ModalWrapper>
      <Styled.Modal>
        <Styled.temp>
          <div>유저마이크</div>
          <RealTimeEditor />
          <div>채팅</div>
        </Styled.temp>
      </Styled.Modal>
    </Styled.ModalWrapper>
  );
};

export default RealTimeModal;
