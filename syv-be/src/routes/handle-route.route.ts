import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../errors";

export default (req: Request, res: Response, next: NextFunction) => {
  throw new BadRequestError("End point does not exist!");
};
