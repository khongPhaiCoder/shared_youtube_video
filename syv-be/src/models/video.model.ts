import mongoose from "mongoose";
import { Video } from "../types/video.types";

const VideoSchema = new mongoose.Schema<Video>(
  {
    embedId: {
      type: String,
      trim: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      trim: true,
      required: true,
    },
    sharedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);
