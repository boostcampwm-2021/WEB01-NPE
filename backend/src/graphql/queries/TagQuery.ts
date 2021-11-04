import { GraphQLFieldConfig, GraphQLInt, GraphQLString } from "graphql";
import TagService from "../services/TagService";
import TagType from "../types/TagType";
export default class TagQuery implements GraphQLFieldConfig<any, any, any> {
  type = TagType;

  args = {
    id: {
      type: GraphQLInt,
      description: "태그의 고유 ID",
    },
    name: {
      type: GraphQLString,
      description: "태그의 이름",
    },
  };

  description =
    "단일 태그를 검색하는 쿼리. ID나 이름을 알 때 나머지를 알기 위해 사용";

  resolve = async (src, args, context) => {
    if (args.id) {
      return await TagService.findTagById(args.id);
    } else if (args.name) {
      return await TagService.findTagByName(args.name);
    } else {
      return [];
    }
  };
}
