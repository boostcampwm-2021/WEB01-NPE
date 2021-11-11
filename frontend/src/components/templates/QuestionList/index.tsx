import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import * as Organism from "@components/organisms";
import { Question } from "@src/types";

interface Props {
  questions: Question[];
}

const SearchResults: FunctionComponent<Props> = ({ questions }) => {
  return (
    <Styled.QuestionList>
      {questions.map((question) => {
        return (
          <li key={question.id}>
            <Organism.Question question={question} />
          </li>
        );
      })}
    </Styled.QuestionList>
  );
};

export default SearchResults;
