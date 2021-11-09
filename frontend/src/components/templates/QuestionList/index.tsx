import React, { FunctionComponent } from "react";

import * as Styled from "./styled";
import * as Organism from "../../organisms";
import * as Type from "../../../types";

interface Props {
  questions: Type.Question[];
}

const SearchResults: FunctionComponent<Props> = ({ questions }) => {
  return (
    <Styled.QuestionList>
      {questions.map((question: Type.Question, index: number) => {
        return (
          <li key={index}>
            <Organism.Question question={question} />
          </li>
        );
      })}
    </Styled.QuestionList>
  );
};

export default SearchResults;
