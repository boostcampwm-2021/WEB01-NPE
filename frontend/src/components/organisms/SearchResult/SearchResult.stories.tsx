import SearchResult from ".";

export default {
  Component: SearchResult,
  title: "Organisms/SearchResult",
};

export const example = () => {
  const onClick = () => {};
  return (
    <SearchResult
      title="이것은 제목"
      markdown="마크다운"
      tags={[
        { label: "react", onClick: onClick },
        { label: "javascript", onClick: onClick },
        { label: "HTML5", onClick: onClick },
      ]}
      views={32}
      comments={5}
    />
  );
};
