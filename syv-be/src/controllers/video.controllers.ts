import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import wrapAsync from "../utils/wrap-async";
import { UserService, VideoService } from "../services";
import { _Request } from "../utils/jwt";
import { UnauthorizedError } from "../errors";
import { io } from "../index";
import { VIDEO_PER_PAGE } from "../config";

const addSharedVideo = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { embedId, title, thumbnailUrl, userId } = req.body;

    const sharedVideo = await VideoService.newSharedVideo({
      embedId,
      title,
      thumbnailUrl,
      userId,
    });

    const user = await UserService.findById(userId);

    await UserService.addSharedVideo(userId, sharedVideo._id);

    io.emit("newVideo", {
      message: `${user.username} has shared a video`,
      video: {
        _id: sharedVideo._id,
        embedId,
        title,
        thumbnailUrl,
        sharedDate: sharedVideo.sharedDate,
        user,
      },
    });

    res.status(StatusCodes.CREATED).json({
      message: "Shared Video Created",
      video: {
        _id: sharedVideo._id,
        embedId,
        title,
        thumbnailUrl,
        userId,
        sharedDate: sharedVideo.sharedDate,
      },
    });
  }
);

const getListSharedVideo = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { pageNumber = 1 } = req.query || {};

    const listShared = await VideoService.getListSharedVideo(+pageNumber);
    const totalSharedVideos = await VideoService.getTotalSharedVideos();

    const totalPages = Math.ceil(totalSharedVideos / VIDEO_PER_PAGE);

    const _listShared = listShared.map((item) => {
      const { userId, ...rest } = item.toObject();

      return { ...rest, user: userId };
    });

    res.status(StatusCodes.OK).json({
      message: "List shared videos",
      videos: _listShared,
      totalPages,
      totalSharedVideos,
      currentPage: pageNumber,
    });
  }
);

const getSharedVideo = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const sharedVideo = await VideoService.getSharedVideo(id);

    // @ts-ignore
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { userId, ...rest } = sharedVideo?.toObject();

    return res.status(StatusCodes.OK).json({
      sharedVideo: { ...rest, user: userId },
    });
  }
);

const getUserSharedVideos = wrapAsync(
  async (req: _Request, res: Response, next: NextFunction) => {
    const id = req.user?._id;
    const { pageNumber = 1 } = req.query || {};

    if (!id) {
      throw new UnauthorizedError("Unauthorized");
    }

    const user = await UserService.getSharedVideoList(id);

    const totalSharedVideos = user?.sharedVideos.length || 0;
    const totalPages = Math.ceil(totalSharedVideos / VIDEO_PER_PAGE);

    const sharedVideos = user?.sharedVideos
      .slice(
        (+pageNumber - 1) * VIDEO_PER_PAGE,
        (+pageNumber - 1) * VIDEO_PER_PAGE + VIDEO_PER_PAGE
      )
      .map((item) => {
        // @ts-ignore
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { userId, ...rest } = item?.toObject();

        return { ...rest, user: userId };
      });

    res.status(StatusCodes.OK).json({
      user: {
        ...user?.toObject(),
        sharedVideos: undefined,
      },
      videos: sharedVideos,
      totalPages,
      totalSharedVideos,
    });
  }
);

export default {
  addSharedVideo,
  getListSharedVideo,
  getSharedVideo,
  getUserSharedVideos,
};
