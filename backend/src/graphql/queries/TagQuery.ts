import { GraphQLFieldConfig, GraphQLInt, GraphQLString } from "graphql";
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
      return [];
    } else if (args.name) {
      return [];
    } else {
      return [];
    }
  };
}
