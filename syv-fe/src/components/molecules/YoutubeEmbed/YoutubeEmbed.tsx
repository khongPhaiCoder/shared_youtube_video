import React from "react";
import { YoutubeEmbedProps } from "./YoutubeEmbed.types";
import { Title, Wrapper } from "./YoutubeEmbed.styled";
import { Container } from "@/components/atoms";
import { formatDate } from "@/utils/date";

const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({
  _id,
  embedId,
  sharedDate,
  thumbnailUrl,
  title,
  user,
}) => {
  return (
    <Container width="100%">
      <Title data-testid="title">{title}</Title>
      <p data-testid="username">User: {user.username}</p>
      <p data-testid="email">Email: {user.email}</p>
      <p data-testid="sharedDate">Shared at: {formatDate(sharedDate)}</p>

      <Wrapper>
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${embedId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
          data-testid="iframe"
        />
      </Wrapper>
    </Container>
  );
};

export default YoutubeEmbed;
