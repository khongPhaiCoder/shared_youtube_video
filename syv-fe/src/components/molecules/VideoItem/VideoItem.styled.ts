import { ThemeMode } from "@/utils/themes";
import styled, { css } from "styled-components";

export const VideoContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  cursor: pointer;
  padding: 6px;
  margin-bottom: 8px;

  &:hover {
    background-color: ${({ theme }: { theme: ThemeMode }) =>
      theme.color.textButtonHover};
  }
  @media (max-width: 860px) {
   padding: 0 20px;
  }
`;

export const ThumbnailContainer = styled.div<{ isLoading?: boolean }>`
  width: 50%;
  max-width: 360px;

  ${(props) =>
    props.isLoading &&
    css`
      position: relative;

      &::before {
        content: "Loading...";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.4);
        width: 100%;
        height: 100%;
        display: block;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}
`;

export const Thumbnail = styled.img`
  width: 100%;
  @media (max-width: 520px) {
    min-width: 156px;
   }
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PopUpContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  background-color: ${({ theme }: { theme: ThemeMode }) =>
    theme.color.textButtonHover};
`;

export const P = styled.p`
    word-break: break-word;
`;