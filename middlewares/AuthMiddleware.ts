import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Auth from "../models/auth";
import { ResponseUserProps } from "../types";

dotenv.config();

const SECRET: string = process.env.SECRET as string;

class AuthMiddleware {
  protected token: string = "";
  protected user: ResponseUserProps = {};

  constructor(request: Request) {
    const header = request.headers["authorization"];

    if (!header) return;

    const [type, token] = header.split(" ");

    if (type !== "Bearer") return;

    this.token = token;
  }

  public getToken(request: Request) {
    const header = request.headers["authorization"];

    if (!header) return undefined;

    const [type, token] = header.split(" ");

    if (type !== "Bearer") return undefined;

    return token;
  }

  public isAuthenticatedUser(): any {
    return jwt.verify(this.token, SECRET, async (err, data: any) => {
      if (err) {
        return undefined;
      }

      this.user = data;
      return data;
    });
  }

  public isAuthorizedUser(id: string): boolean {
    if (id == this.user.id) return true;
    else return false;
  }
}

export default AuthMiddleware;
