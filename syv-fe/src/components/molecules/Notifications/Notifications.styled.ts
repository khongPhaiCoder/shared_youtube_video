import styled from "styled-components";

export const NotificationsContainer = styled.div`
  display: flex;
  gap: 4px;
  overflow: hidden;
`;

export const Thumbnail = styled.img`
  width: 120px;
  height: 67.5px;
`;

export const Text = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;
