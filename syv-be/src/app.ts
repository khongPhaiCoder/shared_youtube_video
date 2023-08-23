import bodyParser from "body-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import compression from "compression";
import errorHandler from "errorhandler";
import cookieParser from "cookie-parser";
import { CLIENT_URL, PORT } from "./config";
import { connectDatabase } from "./configs/db.config";
import { accessLogStream } from "./configs/morgan.config";
import multerConfig from "./configs/multer.config";
import apiRoute, {
  handleRoute,
  errorHandler as routeErrorHandler,
} from "./routes";

const app: Application = express();

app.set("port", PORT || 5000);

connectDatabase();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet());
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000, // just compress when data is over 100kB
    filter: (req: Request, res: Response) => {
      // @ts-ignore
      if (req.header["x-no-compress"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);
app.use(morgan("combined", { stream: accessLogStream }));
app.use(multer(multerConfig.options).fields(multerConfig.fields));

app.use(cors({ origin: CLIENT_URL }));
app.use(errorHandler());

app.use("/api", apiRoute);
app.use("*", handleRoute);
app.use(routeErrorHandler);

export default app;
