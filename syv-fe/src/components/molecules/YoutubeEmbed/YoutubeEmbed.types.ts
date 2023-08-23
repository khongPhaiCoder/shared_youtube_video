export interface YoutubeEmbedProps {
  _id: string;
  embedId: string;
  title: string;
  thumbnailUrl: string;
  sharedDate: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
}
