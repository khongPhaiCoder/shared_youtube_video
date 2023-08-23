import { Video } from "@/pages";

export interface VideoListProps {
  sharedVideos: Video[];
  totalPages: number;
  currentPage: number;
  onLoadNewPage: (newPage: number) => Promise<SharedVideoResponse>;
}

export interface SharedVideoResponse {
  message: string;
  videos: Video[];
  totalPages: number;
  totalSharedVideos: number;
  currentPage: number;
}
