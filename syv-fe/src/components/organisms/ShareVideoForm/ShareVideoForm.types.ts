export interface ShareVideoFormProps {
  onAddSharedVideo: (
    embedId: string,
    title: string,
    thumbnailUrl: string
  ) => void;
}

export type Inputs = {
  url?: string;
};
