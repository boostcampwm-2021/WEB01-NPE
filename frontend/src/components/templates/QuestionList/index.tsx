import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import { Question } from "@components/organisms";
import { QuestionType } from "@src/types";

interface Props {
  questions: QuestionType[];
}

const SearchResults: FunctionComponent<Props> = ({ questions }) => {
  return (
    <Styled.QuestionList>
      {questions.map((question) => {
        return (
          <li key={question.id}>
            <Question question={question} />
          </li>
        );
      })}
    </Styled.QuestionList>
  );
};

export default SearchResults;
