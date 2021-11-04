import { GraphQLFieldConfig, GraphQLList } from "graphql";
import TagService from "../services/TagService";
import TagType from "../types/TagType";
export default class TagsQuery implements GraphQLFieldConfig<any, any, any> {
  type = GraphQLList(TagType);

  args = {};

  description = "모든 태그의 id와 name을 반환";

  resolve = async (src, args, context) => {
    return await TagService.getAllTags();
  };
}
