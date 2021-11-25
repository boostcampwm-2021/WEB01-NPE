import React, { FunctionComponent, useEffect, useState } from "react";
import Router from "next/router";

import * as Styled from "./styled";
import { TagList, ProfileSummary, Vote } from "@components/molecules";
import { MDViewer } from "@components/atoms";
import { AnswerDetailType } from "@src/types";
import { useSession } from "next-auth/client";
import { deleteAnswerById, adoptAnswer } from "@src/lib";
interface Props {
  detail: AnswerDetailType;
  type: "Question" | "Answer";
}

const DetailBody: FunctionComponent<Props> = ({ detail, type }) => {
  const { id, thumbupCount, desc, tags, author, state } = detail;
  const user = useSession();
  const [color, setColor] = useState<string>("");

  const onDelete = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      const { data } = await deleteAnswerById(Number(id));
      if (data) {
        Router.push("/");
      }
    }
  };

  const onCheck = async () => {
    try {
      const { data } = await adoptAnswer(Number(id));
      window.alert("채택되었습니다.");
      setColor("green");
    } catch {
      window.alert("채택할 수 없습니다.");
    }
  };

  useEffect(() => {
    console.log(state);
    setColor(state === 1 ? "green" : "rgba(0, 0, 0, 0.1)");
  }, [state]);

  return (
    <Styled.DetailBody>
      <Styled.VoteContainer>
        <Vote
          id={Number(id)}
          thumbupCount={thumbupCount}
          isQuestion={tags !== undefined}
        />
        {state !== undefined && (
          <Styled.SvgDiv fill={color} onClick={onCheck}>
            <svg aria-hidden="true" width="36" height="36" viewBox="0 0 36 36">
              <path d="m6 14 8 8L30 6v8L14 30l-8-8v-8Z"></path>
            </svg>
          </Styled.SvgDiv>
        )}
      </Styled.VoteContainer>
      <Styled.DetailBodyInner>
        <Styled.DetailBodyDesc>
          <MDViewer content={desc} />
        </Styled.DetailBodyDesc>
        <Styled.DetailBodyInfo>
          {type === "Answer" &&
            Number(user[0]?.userId) === Number(author.id) && (
              <Styled.DeleteBtn onClick={onDelete}>삭제</Styled.DeleteBtn>
            )}
          <div>{tags && <TagList tags={tags} />}</div>
          <div>
            <ProfileSummary author={author} />
          </div>
        </Styled.DetailBodyInfo>
      </Styled.DetailBodyInner>
    </Styled.DetailBody>
  );
};

export default DetailBody;
