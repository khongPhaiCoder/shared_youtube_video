import mongoose from "mongoose";
import { User } from "../types/user.types";
import { DEFAULT_PHOTO } from "../config";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { BadRequestError } from "../errors";

const UserSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: DEFAULT_PHOTO,
    },
    refreshTokens: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RefreshToken",
      },
    ],
    sharedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.virtual("_password")
  .set(function (password: string) {
    this.set("password", this.encryptPassword(password));
  })
  .get(function () {
    return this.password;
  });

UserSchema.post(
  "save",
  (error: any, doc: mongoose.Document, next: Function) => {
    if (error.code === 11000 && error.keyPattern.email === 1) {
      next(new BadRequestError("Email already exist!"));
    } else if (error.code === 11000 && error.keyPattern.username === 1) {
      next(new BadRequestError("Username already exist!"));
    } else {
      next(error);
    }
    next();
  }
);

UserSchema.methods = {
  authenticate(plainPassword: string) {
    return comparePassword(plainPassword, this.password);
  },
  encryptPassword(password?: string) {
    if (!password) return "";
    return hashPassword(password);
  },
};

export default mongoose.model("User", UserSchema);
