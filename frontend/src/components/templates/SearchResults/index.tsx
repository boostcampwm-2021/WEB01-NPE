import React, { FunctionComponent } from "react";
import { StyledSearchResults } from "./styled";

import SearchResult from "../../organisms/SearchResult";

const SearchResults: FunctionComponent = () => {
  const fetchedDataExample = [
    {
      title: "이것은 제목",
      markdown: "마크다운",
      tags: [
        { label: "react", onClick: () => {} },
        { label: "react", onClick: () => {} },
      ],
      views: 32,
      comments: 120,
    },
    {
      title: "이것은 제목2",
      markdown: "마크다운2",
      tags: [
        { label: "javascript", onClick: () => {} },
        { label: "react", onClick: () => {} },
      ],
      views: 32,
      comments: 150,
    },
  ];

  return (
    <StyledSearchResults>
      {fetchedDataExample.map((example, idx) => {
        return (
          <SearchResult
            title={example.title}
            markdown={example.markdown}
            tags={example.tags}
            views={example.views}
            comments={example.comments}
            key={idx}
          ></SearchResult>
        );
      })}
    </StyledSearchResults>
  );
};

export default SearchResults;
