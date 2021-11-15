import React, { FormEvent, FunctionComponent, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import router from "next/router";
import { useSession } from "next-auth/client";

import { POST_QUESTION } from "@src/lib";

import {
  Button,
  Switch,
  TitleText,
  MDEditor,
  TitleInput,
} from "@components/atoms";
import { TagInput } from "@components/molecules";
import * as Styled from "./styled";

const ResisterQuestion: FunctionComponent = () => {
  const [title, setTitle] = useState<string>("");
  const [tagList, setTagList] = useState<string[]>([]);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [session] = useSession();
  const editorRef = useRef<any>(null);
  const [postQuestion] = useMutation(POST_QUESTION);
  const getMarkdown = () => {
    const editorInstance = editorRef.current.getInstance();
    return editorInstance.getMarkdown();
  };
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!session || !session.user || !session.accessToken) return;
    console.log(session.accessToken);
    const { data } = await postQuestion({
      variables: {
        title: title,
        desc: getMarkdown(),
        tagIds: [1, 2, 3, 4, 5, 6],
        realtimeShare: isLive,
        accessToken: session.accessToken,
      },
    });
    if (!data) {
      console.log("error!");
      return;
    }
    const questionId = data.addNewQuestion.id;
    router.push(`/question/${questionId}`);
  };
  return (
    <Styled.Container onSubmit={onSubmit}>
      <Styled.TitleContainer>
        <TitleInput type="Default" setText={setTitle} />
      </Styled.TitleContainer>
      <Styled.TagContainer>
        <TagInput tagList={tagList} setTagList={setTagList} />
      </Styled.TagContainer>
      <Styled.LiveContainer>
        <TitleText type="Default" text="실시간 답변" />
        <Switch type="Default" isChecked={isLive} setIsChecked={setIsLive} />
      </Styled.LiveContainer>
      <MDEditor ref={editorRef} />
      <Styled.SubmitContainer>
        <Button type="Submit" text="질문등록" onClick={() => {}} />
      </Styled.SubmitContainer>
    </Styled.Container>
  );
};

export default ResisterQuestion;
function variables(variables: any, arg1: {}) {
  throw new Error("Function not implemented.");
}
