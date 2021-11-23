import { MiddlewareFn } from "type-graphql";
import { Request } from "express";
import { verify } from "jsonwebtoken";

const AuthMiddleware: MiddlewareFn<Request> = ({ context, info }, next) => {
  if (context.headers.authorization) {
    const token = context.headers.authorization.split(" ")[1];
    const data = verify(token, "keyboard cat") as { userId: number };
    context.userId = data.userId;
    //console.log("authMiddleware excuted!");
  } else {
    //console.log("no headers!");
  }
  return next();
};

export default AuthMiddleware;
