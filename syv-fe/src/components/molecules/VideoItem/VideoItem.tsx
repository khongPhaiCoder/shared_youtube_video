import React, { useCallback } from "react";
import { VideoItemProps } from "./VideoItem.types";
import {
    P,
  Thumbnail,
  ThumbnailContainer,
  Title,
  VideoContainer,
} from "./VideoItem.styled";
import { Container } from "@/components/atoms";
import { formatDate } from "@/utils/date";
import { useRouter } from "next/router";

const VideoItem: React.FC<VideoItemProps> = ({
  _id,
  embedId,
  sharedDate,
  thumbnailUrl,
  title,
  user,
  isLoading = false,
}) => {
  const router = useRouter();

  const onClickHandler = useCallback(() => {
    router.push(`/video/${_id}`);
  }, [_id]);

  return (
    <VideoContainer onClick={onClickHandler}>
        <ThumbnailContainer isLoading={isLoading}>
            <Thumbnail src={thumbnailUrl} alt={title} />
        </ThumbnailContainer>
        <Container display="flex" flexDirection="column" gap="4px" width="50%">
            <Title data-testid="title">{title}</Title>
            <P data-testid="username">Username: {user.username}</P>
            <P data-testid="email">Email: {user.email}</P>
            <P data-testid="sharedDate">Shared At: {formatDate(sharedDate)}</P>
        </Container>
    </VideoContainer>
  );
};

export default VideoItem;
