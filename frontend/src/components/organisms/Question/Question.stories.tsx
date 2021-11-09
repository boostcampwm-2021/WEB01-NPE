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
    title: "안녕",
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
        name: "태그태그",
      },
    ],
    viewCount: 1,
    thumbupCount: 2,
  };
  return <Question question={data} />;
};