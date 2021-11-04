import { GraphQLFieldConfig, GraphQLInt, GraphQLString } from "graphql";
import TagService from "../services/TagService";
import TagType from "../types/TagType";
export default class TagQuery implements GraphQLFieldConfig<any, any, any> {
  type = TagType;

  args = {
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
  };

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
