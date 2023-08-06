import { Request, Response } from "express";
import Auth from "../models/auth";

export const show = async (req: Request,res: Response) => {
    const user = await Auth.findOne({})
};
