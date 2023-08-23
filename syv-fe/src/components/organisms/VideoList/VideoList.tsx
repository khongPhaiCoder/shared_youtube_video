import React, { useCallback, useEffect, useState } from "react";
import { SharedVideoResponse, VideoListProps } from "./VideoList.types";
import { Video } from "@/pages";
import { Container } from "@/components/atoms";
import { Pagination } from "@mui/material";
import { VideoItem } from "@/components/molecules";
import { PaginationContainer } from "./VideoList.styled";

const VideoList: React.FC<VideoListProps> = ({
  currentPage = 1,
  totalPages = 1,
  sharedVideos = [],
  onLoadNewPage,
}) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [curPage, setCurPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);

  useEffect(() => {
    setVideos(sharedVideos);
  }, [sharedVideos]);

  useEffect(() => {
    setCurPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setPageCount(totalPages);
  }, [totalPages]);

  const onChangePageHandler = useCallback(
    async (e: React.ChangeEvent<unknown>, newPage: number) => {
      const response: SharedVideoResponse = await onLoadNewPage(newPage);

      setVideos(response.videos);
      setCurPage(response.currentPage);
      setPageCount(response.totalPages);

      setCurPage(newPage);
    },
    [onLoadNewPage]
  );

  return (
    <Container width="100%">
      {videos.map((item) => (
        <VideoItem {...item} key={item._id} />
      ))}
      <PaginationContainer>
        <Pagination
          count={pageCount}
          page={curPage}
          onChange={onChangePageHandler}
          variant="outlined"
          shape="rounded"
        />
      </PaginationContainer>
    </Container>
  );
};

export default VideoList;
