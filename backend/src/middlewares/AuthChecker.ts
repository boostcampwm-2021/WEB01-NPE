import { AuthChecker } from "type-graphql";
import { Request } from "express";

export const authChecker: AuthChecker<Request> = (
  { root, args, context, info },
  roles
): boolean => {
  //console.log(root);
  //console.log(args);
  console.log(context.headers);
  //   console.log(info);
  return true;
};
