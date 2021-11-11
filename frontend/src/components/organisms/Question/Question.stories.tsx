import Question from ".";

export default {
  Component: Question,
  title: "Organisms/Question",
};

export const example = () => {
  const onClick = () => {};
  const data = {
    __typename: "PostQuestion",
    id: 1,
    title: "리액트 관련 질문이 있습니다.",
    realtimeShare: false,
    author: {
      id: "1",
      profileUrl: "https://avatars.githubusercontent.com/u/67536413",
      score: 23,
      username: "안녕",
      __typename: "User",
    },
    desc: "내용",
    tags: [
      {
        __typename: "Tag",
        name: "react.js",
      },
    ],
    viewCount: 1,
    thumbupCount: 2,
  };
  return <Question question={data} />;
};
