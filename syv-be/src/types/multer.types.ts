import { Request } from "express";
import multer from "multer";

export type FileStorageCb = (error: Error | null, destination: string) => void;

export type FileFilterCb = (error: Error | null, destination: boolean) => void;

export type FileFilter = (
  req: Request,
  file: any,
  cb: multer.FileFilterCallback
) => void;

export interface MulterConfig {
  options: multer.Options;
  fields: multer.Field[];
}
