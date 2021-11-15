import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import { Question } from "@components/organisms";
import { QuestionType } from "@src/types";

interface Props {
  questions: QuestionType[];
  showProfile?: boolean;
}

const SearchResults: FunctionComponent<Props> = ({
  questions,
  showProfile = true,
}) => {
  return (
    <Styled.QuestionList>
      {questions.map((question) => {
        return (
          <Styled.QuestionItem key={question.id}>
            <Question question={question} showProfile={showProfile} />
          </Styled.QuestionItem>
        );
      })}
    </Styled.QuestionList>
  );
};

export default SearchResults;
