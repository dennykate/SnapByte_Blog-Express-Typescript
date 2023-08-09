import { Request, Response } from "express";
import AuthMiddleware from "./AuthMiddleware";
import { returnErrorMessage } from "../utils/functions";

class BlogMiddleware {
  constructor() {}

  static isAuthenticatedUser(req: Request, res: Response, next: () => void) {
    const Auth = new AuthMiddleware(req);
    const user = Auth.isAuthenticatedUser();

    if (user == undefined)
      return returnErrorMessage(res, { message: "you're unauthenticated" });
    else next();
  }
}

export default BlogMiddleware;
