import { GraphQLEnumType, GraphQLFieldConfig, GraphQLNonNull } from "graphql";
import PostQuestionInput from "../inputTypes/PostQuestionInput";
import PostService from "../services/PostService";
import PostQuestionType from "../types/PostQuestionType";

export default class QuestionMutation
  implements GraphQLFieldConfig<any, any, any>
{
  questionModeEnum = new GraphQLEnumType({
    name: "question_mutation_mode",
    description: "글 작성, 글 수정, 글 삭제 중 하나를 받습니다.",
    values: {
      CREATE: {
        description: "글 작성시 사용",
      },
      UPDATE: {
        description: "글 수정시 사용",
      },
      DELETE: {
        description: "글 삭제시 사용",
      },
    },
  });

  type = PostQuestionType;

  description =
    "질문 작성 뮤테이션 입니다. CREATE 가 구현되었습니다. 현재 테스트 중이므로 해당 작성글은 userId 1번으로 작성됩니다.";

  args = {
    mode: {
      type: GraphQLNonNull(this.questionModeEnum),
      description: "요청 타입 지정",
    },
    question: {
      name: "PostQuestionInput",
      type: PostQuestionInput,
      description: "질문글 입력 오브젝트",
    },
  };

  resolve = async (src, args, context) => {
    switch (args.mode) {
      case "CREATE":
        return await PostService.addNewQuestion(args.question, { id: 1 });
      case "UPDATE":
        return {};
      case "DELETE":
        return {};
    }
  };
}
