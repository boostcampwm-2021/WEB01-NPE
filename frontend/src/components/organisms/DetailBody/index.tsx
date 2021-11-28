import React, { FunctionComponent, useEffect, useState } from "react";
import Router from "next/router";

import * as Styled from "./styled";
import { TagList, ProfileSummary, Vote } from "@components/molecules";
import { MDViewer } from "@components/atoms";
import { AnswerDetailType } from "@src/types";
import { useSession } from "next-auth/client";
import { deleteAnswerById, adoptAnswer } from "@src/lib";

import {
  CANNOT_CONFIRM_MESSAGE,
  DELETE_MESSAGE,
  CONFIRM_MESSAGE,
} from "@src/lib/message";
interface Props {
  detail: AnswerDetailType;
  type: "Question" | "Answer";
  isAdoptable?: boolean;
}

const DetailBody: FunctionComponent<Props> = ({
  detail,
  type,
  isAdoptable,
}) => {
  const { id, thumbupCount, desc, tags, author, state } = detail;
  const user = useSession();
  const [color, setColor] = useState<string>("");

  const onDelete = async () => {
    if (window.confirm(DELETE_MESSAGE)) {
      const { data } = await deleteAnswerById(Number(id));
      if (data) {
        Router.push("/");
      }
    }
  };

  const onCheck = async () => {
    try {
      const { data } = await adoptAnswer(Number(id));
      window.alert(CONFIRM_MESSAGE);
      setColor("green");
    } catch {
      window.alert(CANNOT_CONFIRM_MESSAGE);
    }
  };

  useEffect(() => {
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
        {state !== undefined && isAdoptable !== undefined && isAdoptable && (
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
