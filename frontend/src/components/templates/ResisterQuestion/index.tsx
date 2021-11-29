import React, { FormEvent, FunctionComponent, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import router from "next/router";
import { useSession } from "next-auth/client";

import { postQuestion } from "@src/lib";

import {
  Button,
  Switch,
  TitleText,
  MDEditor,
  TitleInput,
} from "@components/atoms";
import { TagInput, Modal } from "@components/molecules";
import * as Styled from "./styled";
import { TagType } from "@src/types";

const ResisterQuestion: FunctionComponent = () => {
  const [title, setTitle] = useState<string>("");
  const [tagList, setTagList] = useState<TagType[]>([]);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [session] = useSession();
  const editorRef = useRef<any>(null);
  const [isModal, setIsModal] = useState<boolean>(false);
  // const [postQuestion] = useMutation(POST_QUESTION);
  const getMarkdown = () => {
    const editorInstance = editorRef.current.getInstance();
    return editorInstance.getMarkdown();
  };
  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!session || !session.user) return;
    if (title && title.length < 5) {
      setIsModal(true);
      return;
    }
    const { data } = await postQuestion({
      title: title,
      desc: getMarkdown(),
      tagIds: tagList
        .filter((tag) => tag.id !== "-1")
        .map((tag) => Number(tag.id)),
      realtimeShare: isLive,
    });

    if (!data) return;
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
      <MDEditor ref={editorRef} type="Question" />
      <Styled.SubmitContainer>
        <Button type="Submit" text="질문등록" onClick={() => {}} />
      </Styled.SubmitContainer>
      {isModal && (
        <Modal
          show={isModal}
          onClose={() => {
            setIsModal(false);
          }}
        >
          제목은 5자 이상으로 입력해주세요
        </Modal>
      )}
    </Styled.Container>
  );
};

export default ResisterQuestion;
