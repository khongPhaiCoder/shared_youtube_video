import {
  Layout,
  LayoutProps,
  SharedVideoResponse,
  VideoList,
} from "@/components";
import api from "@/utils/api";
import { GetServerSideProps } from "next";
import React, { useCallback, useMemo } from "react";

export interface Video {
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

interface Props {
  sharedVideos: Video[];
  totalPages: number;
  totalSharedVideos: number;
  currentPage: number;
}

const Home: React.FC<Props> = ({
  sharedVideos = [],
  totalPages = 1,
  currentPage = 1,
}) => {
  const onLoadNewPageHandler = useCallback(
    async (newPage: number): Promise<SharedVideoResponse> => {
      return await api.get(`/video?pageNumber=${newPage}`);
    },
    []
  );

  const layoutProps: LayoutProps = useMemo(
    () => ({
      seoTitle: "Youtube Video Sharing App",
    }),
    []
  );

  return (
    <Layout {...layoutProps}>
      <VideoList
        currentPage={currentPage}
        totalPages={totalPages}
        sharedVideos={sharedVideos}
        onLoadNewPage={onLoadNewPageHandler}
      />
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, params } = ctx;

  const lan = locale ? locale : "en";

  const lngDict = await import(`../../public/lang/${lan}.json`);

  const response: SharedVideoResponse = await api.get("/video");

  return {
    props: {
      lngDict: JSON.parse(JSON.stringify(lngDict)),
      sharedVideos: response.videos,
      totalPages: response.totalPages,
      totalSharedVideos: response.totalSharedVideos,
      currentPage: response.currentPage,
    },
  };
};
