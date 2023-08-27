import { validationResult } from "express-validator";
import { Request, Response } from "express";
import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import Auth from "../models/auth";
import { returnErrorMessage, returnSuccessMessage } from "../utils/functions";

dotenv.config();

const SECRET: string = process.env.SECRET as string;

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return returnErrorMessage(res, { errors: errors.array() });
  }

  try {
    const { name, email, password, password_confirmation, profile } = req.body;

    if (password != password_confirmation) {
      return returnErrorMessage(res, { message: "passwords doesn't match" });
    }

    const isExistEmail = await Auth.findOne({ email });

    if (isExistEmail) {
      return returnErrorMessage(res, { message: "email  already taken" });
    }

    const hashedPassword = crypto
      .createHash("md5")
      .update(req.body.password)
      .digest("hex");

    await Auth.create({
      name,
      email,
      password: hashedPassword,
      profile,
    });

    return returnSuccessMessage(res, { message: "register successful" }, 201);
  } catch (error) {
    return returnErrorMessage(res, { message: "server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return returnErrorMessage(res, { errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const hashedPassword = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    const user = await Auth.findOne({ email, password: hashedPassword });

    if (!user) {
      return returnErrorMessage(res, { message: "user not found" });
    }

    jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
      SECRET,
      { expiresIn: 60 * 24 },
      (err, token) => {
        if (err) {
          return returnErrorMessage(res, { message: "user not found" });
        }

        return returnSuccessMessage(
          res,
          {
            message: "login successful",
            token,
            user: {
              name: user.name,
              email: user.email,
              profile: user.profile,
              id: user._id,
            },
          },
          201
        );
      }
    );
  } catch (error) {
    return returnErrorMessage(res, { message: "server error" });
  }
};
