import * as React from "react";
import { useSession } from "next-auth/client";

import * as Styled from "./styled";
import { Button, ContentText, TitleText } from "@src/components/atoms";
import { QuestionDetailType } from "@src/types";

interface IExitCheckModalWarpperProps {
  question: QuestionDetailType;
  disconnectAndExit: VoidFunction;
}

const ExitCheckModalWarpper: React.FunctionComponent<IExitCheckModalWarpperProps> = ({
  question,
  disconnectAndExit,
}) => {
  const [session] = useSession();
  const [visibility, setVisibility] = React.useState("hidden");
  if (!session || !session.accessToken) throw new Error("Something wrong!");

  React.useEffect(() => {
    const exitModalDiv = document.getElementById("exitModal");
    exitModalDiv!.style.visibility = visibility;
  }, [visibility]);

  const turnoffModal = () => setVisibility("hidden");

  return (
    <>
      <Styled.ExitCheckModalWrapper id="exitModal">
        <Styled.ExitCheckModal>
          <TitleText type="Default" text="정말 나가시겠습니까?"></TitleText>
          {session.userId == question.author.id ? (
            <>
              <Styled.ButtonWapper>
                <Button
                  type="realtime_exit"
                  text="나가기"
                  onClick={disconnectAndExit}
                ></Button>
                <Button
                  type="realtime_exit"
                  text="취소"
                  onClick={turnoffModal}
                ></Button>
              </Styled.ButtonWapper>
            </>
          ) : (
            <>
              <ContentText
                type="Default"
                text="편집된 코드를 답변으로 등록할 수 있습니다"
              ></ContentText>
              <Styled.ButtonWapper>
                <Button
                  type="realtime_exit"
                  text="답변달기"
                  onClick={disconnectAndExit}
                ></Button>
                <Button
                  type="realtime_exit"
                  text="그냥 나가기"
                  onClick={disconnectAndExit}
                ></Button>
                <Button
                  type="realtime_exit"
                  text="취소"
                  onClick={turnoffModal}
                ></Button>
              </Styled.ButtonWapper>
            </>
          )}
        </Styled.ExitCheckModal>
      </Styled.ExitCheckModalWrapper>
    </>
  );
};

export default ExitCheckModalWarpper;
