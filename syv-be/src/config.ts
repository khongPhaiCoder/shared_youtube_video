import * as dotenv from "dotenv";
import { ENV } from "./constants";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;

export const MONGO_URL =
  NODE_ENV === ENV.PRODUCT
    ? process.env.MONGO_URL_PRODUCT
    : process.env.MONGO_URL_DEV;

export const PORT =
  NODE_ENV === ENV.PRODUCT ? process.env.PORT_PRODUCT : process.env.PORT_DEV;

export const CLIENT_URL =
  NODE_ENV === ENV.PRODUCT
    ? process.env.CLIENT_URL_PRODUCT
    : process.env.CLIENT_URL_DEV;

export const JWT_SECRET =
  NODE_ENV === ENV.PRODUCT
    ? process.env.CLIENT_URL_PRODUCT
    : process.env.JWT_SECRET_DEV;

export const JWT_LIFETIME = process.env.JWT_LIFETIME;

export const LOG_FILE = process.env.LOG_FILE || "access.log";

export const ACCESS_LOG_STREAM_INTERVAL =
  process.env.ACCESS_LOG_STREAM_INTERVAL || "1d";

export const SESSION_SECRET = process.env.SESSION_SECRET;

export const DEFAULT_PHOTO = process.env.DEFAULT_PHOTO;

export const VIDEO_PER_PAGE = 10;
