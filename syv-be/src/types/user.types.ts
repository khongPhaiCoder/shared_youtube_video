import { RefreshToken } from "./refresh-token";
import { Video } from "./video.types";

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  photo: string;
  resetPasswordLink: string;
  isVerified: boolean;
  refreshTokens: RefreshToken[];
  sharedVideos: Video[];
  authenticate: (plainPassword: string) => boolean;
  encryptPassword: (password: string) => string;
}
