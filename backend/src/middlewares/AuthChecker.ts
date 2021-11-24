import { AuthChecker } from "type-graphql";
import { Request } from "express";
import { verify } from "jsonwebtoken";

export const authChecker: AuthChecker<Request> = (
  { root, args, context, info },
  roles
): boolean => {
  // if (context.headers.authorization) {
  //   const token = context.headers.authorization.split(" ")[1];
  //   const data: any = verify(token, "keyboard cat");
  // }
  return true;
};
