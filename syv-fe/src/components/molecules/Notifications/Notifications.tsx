import React, { useContext, useEffect } from "react";
import { NotificationsProps, VideoData } from "./Notifications.types";
import { disconnectSocket, getSocket, initiateSocket } from "@/utils/socket";
import { toast } from "react-toastify";
import {
  NotificationsContainer,
  Text,
  Thumbnail,
} from "./Notifications.styled";
import { Container } from "@/components/atoms";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/router";

const Notifications: React.FC<NotificationsProps> = ({}) => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      initiateSocket();

      const socket = getSocket();

      socket.on("newVideo", (videoData: VideoData) => {
        toast(
          <NotificationsContainer>
            <Thumbnail
              src={videoData.video.thumbnailUrl}
              alt={videoData.video.title}
            />
            <Container>
              <Text>{videoData.message}</Text>
              <Text>{videoData.video.title}</Text>
            </Container>
          </NotificationsContainer>,
          {
            onClick: () => {
              router.push(`/video/${videoData.video._id}`);
            },
          }
        );
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [isLoggedIn]);

  return <></>;
};

export default Notifications;
