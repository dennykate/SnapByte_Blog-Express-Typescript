import { Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Auth from "../models/auth";
import { ResponseUserProps } from "../types";

dotenv.config();

const SECRET: string = process.env.SECRET as string;

class AuthMiddleware {
  protected token: string = "";

  constructor(request: Request) {
    const header = request.headers["authorization"];

    if (!header) return;

    const [type, token] = header.split(" ");

    if (type !== "Bearer") return;

    this.token = token;
  }

  public isAuthenticatedUser(): any {
    return jwt.verify(this.token, SECRET, async (err, data: any) => {
      if (err) {
        return undefined;
      }

      // const isAdmin = await Auth.findOne({
      //   email: data.email,
      //   password: data.password,
      // });

      // if (!isAdmin) {
      //   return undefined;
      // } else {
      //   return isAdmin;
      // }

      return data;
    });
  }
}

export default AuthMiddleware;
