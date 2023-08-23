import { Layout, LayoutProps, YoutubeEmbed } from "@/components";
import api from "@/utils/api";
import { GetServerSideProps } from "next";
import { Video } from "../index";

interface Props {
  video: Video;
}

const Home: React.FC<Props> = ({ video }) => {
  const layoutProps: LayoutProps = {
    seoTitle: "Youtube Video Sharing App",
  };

  return (
    <Layout {...layoutProps}>
      <YoutubeEmbed {...video} />
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, params } = ctx;

  const lan = locale ? locale : "en";
  const id = params?.id;

  const lngDict = await import(`../../../public/lang/${lan}.json`);

  const response: { sharedVideo: Video } = await api.get(`/video/${id}`);

  return {
    props: {
      lngDict: JSON.parse(JSON.stringify(lngDict)),
      video: response.sharedVideo,
    },
  };
};
