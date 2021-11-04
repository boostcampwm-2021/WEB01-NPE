import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import PostService from "../services/PostService";
import TagService from "../services/TagService";
import UserService from "../services/UserService";
import PostAnswerType from "./PostAnswerType";
import TagType from "./TagType";
import UserType from "./UserType";

export default new GraphQLObjectType({
  name: "PostQuestion",
  description:
    "질문글에 대한 오브젝트 입니다. 하나의 오브젝트가 하나의 질문을 의미합니다.",
  fields: () => ({
    id: {
      type: GraphQLInt,
      description: "해당 글의 고유 id. 글 생성 순으로 지정",
    },
    user_id: {
      type: GraphQLInt,
      description: "해당 글 작성자의 id",
      resolve: (question) => question.userId,
    },
    title: {
      type: GraphQLString,
      description: "글 제목",
    },
    desc: {
      type: GraphQLString,
      description: "글 내용",
    },
    view_count: {
      type: GraphQLInt,
      description: "조회수",
      resolve: (question) => question.viewCount,
    },
    thumbup_count: {
      type: GraphQLInt,
      description: "좋아요 개수",
      resolve: (question) => question.thumbupCount,
    },
    realtime_share: {
      type: GraphQLBoolean,
      description: "실시간 답변 허용 여부",
      resolve: (question) => question.realtimeShare,
    },
    created_at: {
      type: GraphQLString,
      description: "글 생성 시각",
      resolve: (question) => question.createdAt.toString(),
    },
    score: {
      type: GraphQLInt,
      description: "글 채택시 지급할 점수",
      resolve: (question) => question.score ?? 0,
    },
    user: {
      type: UserType,
      description: "작성자 User Object",
      resolve: async (question) => {
        const user = await UserService.findOneUserByArgs({
          id: question.userId,
        });

        return user;
      },
    },
    tags: {
      type: GraphQLList(TagType),
      description: "해당 글에 속한 태그들",
      resolve: async (question) => {
        const tagIds = await PostService.getAllTagIdsByQuestionId(question.id);
        const tags = await TagService.findTagByIds(tagIds);

        return tags;
      },
    },
    question_answer: {
      type: new GraphQLList(PostAnswerType),
      description: "해당 글에 속한 답변글들",
      resolve: async (question) => {
        const answers = await PostService.findAllAnswerByArgs({
          postQuestionId: question.id,
        });
        return answers;
      },
    },
  }),
});
