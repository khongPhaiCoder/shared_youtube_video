import mongoose from "mongoose";
import { RefreshToken } from "../types/refresh-token";

const RefreshTokenSchema = new mongoose.Schema<RefreshToken>(
  {
    hashedToken: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("RefreshToken", RefreshTokenSchema);
