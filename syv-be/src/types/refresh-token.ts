import mongoose from "mongoose";

export interface RefreshToken {
  _id: string;
  hashedToken: string;
  user: mongoose.Schema.Types.ObjectId;
}
