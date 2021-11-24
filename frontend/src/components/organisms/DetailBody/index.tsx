import React, { FunctionComponent } from "react";
import Router from "next/router";

import * as Styled from "./styled";
import { TagList, ProfileSummary, Vote } from "@components/molecules";
import { MDViewer } from "@components/atoms";
import { DetailType } from "@src/types";
import { useSession } from "next-auth/client";
import { deleteAnswerById } from "@src/lib";
interface Props {
  detail: DetailType;
  type: "Question" | "Answer";
}

const DetailBody: FunctionComponent<Props> = ({ detail, type }) => {
  const { id, thumbupCount, desc, tags, author } = detail;
  const user = useSession();
  const onDelete = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      const { data } = await deleteAnswerById(Number(id));
      if (data) {
        Router.push("/");
      }
    }
  };
  return (
    <Styled.DetailBody>
      <Styled.VoteContainer>
        <Vote
          id={Number(id)}
          thumbupCount={thumbupCount}
          isQuestion={tags !== undefined}
        />
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
