import React, { FormEvent, FunctionComponent, useRef, useState } from "react";

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
  const editorRef = useRef<any>(null);
  const getMarkdown = () => {
    const editorInstance = editorRef.current.getInstance();
    return editorInstance.getMarkdown();
  };
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("폼 Submit");
    //submit 코드
  };
  return (
    <Styled.Container onSubmit={onSubmit}>
      <Styled.TitleContainer>
        <TitleInput type="Default" text={title} setText={setTitle} />
      </Styled.TitleContainer>
      <Styled.TagContainer>
        <TagInput tagList={tagList} setTagList={setTagList} />
      </Styled.TagContainer>
      <Styled.LiveContainer>
        <TitleText type="Default" text="실시간 답변" />
        <Switch type="Default" isChecked={isLive} setIsChecked={setIsLive} />
      </Styled.LiveContainer>
      <MDEditor editorRef={editorRef} />
      <Styled.SubmitContainer>
        <Button type="Submit" text="질문등록" onClick={() => {}} />
      </Styled.SubmitContainer>
    </Styled.Container>
  );
};

export default ResisterQuestion;
