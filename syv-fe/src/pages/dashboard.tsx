import {
  Container,
  Layout,
  LayoutProps,
  ShareVideoForm,
  SharedVideoResponse,
  VideoItem,
  VideoList,
  YoutubeEmbed,
} from "@/components";
import { AuthContext } from "@/contexts/authContext";
import api from "@/utils/api";
import withAuth from "@/utils/withAuth";
import { GetServerSideProps } from "next";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { v4 } from "uuid";
import { Video } from "./index";
import { useI18n } from "next-localization";
import { LANG } from "@/constants";

const Dashboard: React.FC = () => {
  const { t } = useI18n();
  const { userData } = useContext(AuthContext);
  const userId = userData?._id || "";
  const [sharedList, setSharedList] = useState<Video[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const layoutProps: LayoutProps = useMemo(
    () => ({
      seoTitle: "Dashboard",
    }),
    []
  );

  const onAddSharedVideoHandler = useCallback(
    async (embedId: string, title: string, thumbnailUrl: string) => {
      const _id = v4();

      setSharedList((sharedList) => [
        {
          _id,
          embedId,
          title,
          thumbnailUrl,
          sharedDate: new Date().toString(),
          user: {
            _id: userData?._id!,
            username: userData?.username!,
            email: userData?.email!,
          },
          isLoading: true,
        },
        ...sharedList,
      ]);

      const response: { message: string; video: Video } = await api.post(
        "/video/add",
        {
          embedId,
          userId,
          title,
          thumbnailUrl,
        }
      );

      setSharedList((sharedList) =>
        sharedList.map((item) => {
          if (item._id === _id) {
            return {
              ...item,
              _id: response.video._id,
              isLoading: false,
            };
          }

          return item;
        })
      );
    },
    []
  );

  const onLoadNewPageHandler = useCallback(
    async (newPage: number): Promise<SharedVideoResponse> => {
      return await api.get(`/video/user/videos?pageNumber=${newPage}`);
    },
    []
  );

  useEffect(() => {
    const fetchSharedVideos = async () => {
      try {
        const response: SharedVideoResponse = await api.get(
          `/video/user/videos`
        );

        if (response.videos.length) {
          setSharedList(response.videos);
          setCurrentPage(response.currentPage);
          setTotalPages(response.totalPages);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSharedVideos();
  }, []);

  return (
    <Layout {...layoutProps}>
      <ShareVideoForm onAddSharedVideo={onAddSharedVideoHandler} />
      {sharedList.length ? (
        <VideoList
          currentPage={currentPage}
          totalPages={totalPages}
          sharedVideos={sharedList}
          onLoadNewPage={onLoadNewPageHandler}
        />
      ) : (
        <Container
          height="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {t(LANG.NO_VIDEOS_FOUND)}
        </Container>
      )}
    </Layout>
  );
};

export default withAuth(Dashboard);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, params } = ctx;

  const lan = locale ? locale : "en";

  const lngDict = await import(`../../public/lang/${lan}.json`);

  return {
    props: {
      lngDict: JSON.parse(JSON.stringify(lngDict)),
    },
  };
};
