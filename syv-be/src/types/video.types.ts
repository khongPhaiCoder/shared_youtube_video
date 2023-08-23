import { User } from "./user.types";

export interface Video {
  _id: string;
  embedId: string;
  userId: User;
  title: string;
  thumbnailUrl: string;
  sharedDate: Date;
}
