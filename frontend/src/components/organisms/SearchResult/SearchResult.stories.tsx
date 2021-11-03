import SearchResult from ".";

export default {
  Component: SearchResult,
  title: "Organisms/SearchResult",
};

export const example = () => {
  return (
    <SearchResult
      title="이것은 제목"
      markdown="마크다운"
      tagDatas={[
        { text: "react", deleteHandler: () => {} },
        { text: "react", deleteHandler: () => {} },
      ]}
      views={32}
    />
  );
};
