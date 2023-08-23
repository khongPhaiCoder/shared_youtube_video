import multer from "multer";
import path from "path";
import { v4 } from "uuid";
import { Request } from "express";

import { MIME_TYPE } from "../constants";
import { FileFilter, FileStorageCb, MulterConfig } from "../types/multer.types";

const fileStorage: multer.StorageEngine = multer.diskStorage({
  destination: (req: Request, file: any, cb: FileStorageCb) => {
    cb(null, "src/public/images");
  },
  filename: (req: Request, file: any, cb: FileStorageCb) => {
    cb(null, v4() + path.extname(file.originalname));
  },
});

const fileFilter: FileFilter = (
  req: Request,
  file: any,
  cb: multer.FileFilterCallback
) => {
  if (
    file.mimetype === MIME_TYPE.JPEG ||
    file.mimetype === MIME_TYPE.JPG ||
    file.mimetype === MIME_TYPE.PNG
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerConfig: MulterConfig = {
  options: {
    storage: fileStorage,
    fileFilter,
  },
  fields: [
    {
      name: "image",
      maxCount: 1,
    },
  ],
};

export default multerConfig;
