import React, { FunctionComponent, useState } from "react";
import * as Socket from "socket.io-client";

import * as Styled from "./styled";
import { Button, Logo, TitleText, Text } from "@components/atoms";
import { QuestionDetailType } from "@src/types";
import { useSession } from "next-auth/client";
import LiveChat from "@src/components/organisms/LiveChat";

const RealTimeModal: FunctionComponent<{ question: QuestionDetailType }> = ({
  question,
}) => {
  const [socket, setSocket] = useState<Socket.Socket>();
  const [session] = useSession();
  console.log(session);
  if (!session || !session.accessToken) throw new Error("Auth Required");

  React.useEffect(() => {
    const token = session.accessToken;
    const newSocket = Socket.connect("http://localhost:4000/", {
      auth: { token },
    });
    setSocket(newSocket);
    newSocket.emit("joinRoom", {
      questionId: question.id,
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const yjssocket = "?";

  return (
    <Styled.ModalWrapper>
      <Styled.Modal>
        <Styled.temp>
          <div>마이크</div>
          <div>코드</div>
          {socket && <LiveChat socket={socket} />}
        </Styled.temp>
      </Styled.Modal>
    </Styled.ModalWrapper>
  );
};

export default RealTimeModal;
