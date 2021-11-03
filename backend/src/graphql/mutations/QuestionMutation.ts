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

  args = {
    mode: {
      type: GraphQLNonNull(this.questionModeEnum),
    },
    question: {
      name: "PostQuestionInput",
      type: PostQuestionInput,
    },
  };

  resolve = async (src, args, context) => {
    switch (args.mode) {
      case "CREATE":
        return await PostService.addNewQuestion(args.question, { id: 173 });
      case "UPDATE":
        return {};
      case "DELETE":
        return {};
    }
  };
}
