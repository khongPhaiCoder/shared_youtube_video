import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import { BadRequestError } from "../errors";

export default (req: Request, res: Response, next: NextFunction) => {
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new BadRequestError("Validation failed");
    error.data = errors.array().map((err: ValidationError) => err.msg);
    throw error;
  }

  next();
};
