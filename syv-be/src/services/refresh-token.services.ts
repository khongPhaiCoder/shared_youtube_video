import crypto from "crypto";
import { ObjectId } from "mongoose";
import { RefreshTokenModel } from "../models";
import { RefreshToken } from "../types/refresh-token";

const newRefreshToken = async (payload: {
  userId: string;
  refreshToken: string;
}): Promise<RefreshToken> => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(payload.refreshToken)
    .digest("hex");

  const refreshToken = new RefreshTokenModel({
    hashedToken,
    user: payload.userId,
  });

  return await refreshToken.save();
};

const findRefreshToken = async (
  refreshToken: string
): Promise<RefreshToken | null> => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  return await RefreshTokenModel.findOne({ hashedToken });
};

const deleteRefreshToken = async (
  refreshToken: string
): Promise<RefreshToken | null> => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  return await RefreshTokenModel.findOneAndDelete({ hashedToken });
};

const deleteRefreshTokenById = async (
  tokenId: ObjectId
): Promise<RefreshToken | null> => {
  return await RefreshTokenModel.findByIdAndDelete(tokenId);
};

export default {
  newRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteRefreshTokenById,
};
