import QuestionList from ".";

export default {
  Component: QuestionList,
  title: "Templates/QuestionList",
};

export const example = () => {
  const data = [
    {
      __typename: "PostQuestion",
      id: 1,
      title: "안녕하세요 react관련해서 궁금한 점이 있습니다.",
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
    },
    {
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
    },
  ];
  return <QuestionList questions={data} />;
};
