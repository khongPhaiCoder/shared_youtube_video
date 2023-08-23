import path from "path";
import { RotatingFileStream, createStream } from "rotating-file-stream";
import { ACCESS_LOG_STREAM_INTERVAL, LOG_FILE } from "../config";

export const accessLogStream: RotatingFileStream = createStream(LOG_FILE, {
  interval: ACCESS_LOG_STREAM_INTERVAL,
  path: path.join(__dirname, "..", "logs"),
});
