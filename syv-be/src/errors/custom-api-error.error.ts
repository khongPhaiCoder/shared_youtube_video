import { StatusCodes } from "http-status-codes";

export default class CustomAPIError extends Error {
  public statusCode: StatusCodes;
  public data: any;
  public status?: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
