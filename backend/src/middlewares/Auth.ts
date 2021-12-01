import { MiddlewareFn } from "type-graphql";
import { Request } from "express";
import { verify } from "jsonwebtoken";

const Auth: MiddlewareFn<Request> = ({ context, info }, next) => {
  if (context.headers.authorization) {
    const token = context.headers.authorization.split(" ")[1];
    const data = verify(token, process.env.JWT_TOKEN) as { userId: number };
    context.userId = data.userId;
  }
  return next();
};

export default Auth;
