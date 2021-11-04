import React, { FunctionComponent } from "react";
import { StyledSearchResults } from "./styled";

import SearchResult from "../../organisms/SearchResult";

const SearchResults: FunctionComponent = () => {
  const fetchedDataExample = [
    {
      title: "이것은 제목",
      markdown: "마크다운",
      tagDatas: [
        { text: "react", onDelete: () => {} },
        { text: "react", onDelete: () => {} },
      ],
      views: 32,
    },
    {
      title: "이것은 제목2",
      markdown: "마크다운2",
      tagDatas: [
        { text: "javascript", onDelete: () => {} },
        { text: "react", onDelete: () => {} },
      ],
      views: 32,
    },
  ];

  return (
    <StyledSearchResults>
      {fetchedDataExample.map((example, idx) => {
        return (
          <SearchResult
            title={example.title}
            markdown={example.markdown}
            tagDatas={example.tagDatas}
            views={example.views}
            key={idx}
          ></SearchResult>
        );
      })}
    </StyledSearchResults>
  );
};

export default SearchResults;
