import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { v4 } from "uuid";
import wrapAsync from "../utils/wrap-async";
import { RefreshTokenService, UserService } from "../services";
import { BadRequestError, UnauthenticatedError } from "../errors";
import { generateToken } from "../utils/jwt";

const signUp = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    const user = await UserService.newUser({
      username,
      email,
      _password: password,
    });

    res.status(StatusCodes.CREATED).json({
      message: "User created",
      user: {
        _id: user._id,
        username,
        email,
      },
    });
  }
);

const logIn = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await UserService.findByEmail(email);

    if (!user.authenticate(password)) {
      throw new UnauthenticatedError("Email or password incorrect!");
    }

    const { _id, username } = user;

    const accessToken = generateToken(
      { _id, username, email },
      60 * 60 * 30 * 1000
    );
    const tokenId = v4();
    const refreshToken = generateToken(
      { _id, username, email, tokenId },
      24 * 60 * 60 * 30 * 1000 // 30 days
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 30 * 1000, // 30 days
    });

    const _refreshToken = await RefreshTokenService.newRefreshToken({
      userId: _id,
      refreshToken,
    });

    await UserService.addRefreshToken(_id, _refreshToken._id);

    res
      .status(StatusCodes.OK)
      .json({ user: { _id, username, email }, accessToken });
  }
);

const refreshAccessToken = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.body;
    const preRefreshToken = req.cookies?.refreshToken;

    const user = await UserService.findById(_id);

    const tokenId = v4();
    const refreshToken = generateToken(
      {
        _id,
        username: user.username,
        email: user.email,
        tokenId,
      },
      24 * 60 * 60 * 30 * 1000 // 30 days
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 30 * 1000, // 30 days
    });

    const _refreshToken = await RefreshTokenService.newRefreshToken({
      userId: _id,
      refreshToken,
    });

    const updatedUser = await UserService.removeRefreshToken(
      _id,
      preRefreshToken
    );

    if (!updatedUser) {
      throw new UnauthenticatedError("Refresh token invalid!");
    }

    await UserService.addRefreshToken(_id, _refreshToken._id);

    const accessToken = generateToken({
      _id,
      username: user.username,
      email: user.email,
    });

    return res.status(StatusCodes.OK).json({
      user: { _id, username: user.username, email: user.email },
      accessToken,
    });
  }
);

const logOut = wrapAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies?.refreshToken;
    const { _id } = req.body;

    if (!refreshToken) {
      throw new BadRequestError("No Refresh Token");
    }

    const updatedUser = await UserService.removeRefreshToken(_id, refreshToken);

    if (!updatedUser) {
      throw new UnauthenticatedError("Refresh token invalid!");
    }

    res.clearCookie("refreshToken");

    return res.status(StatusCodes.OK).json({
      message: "Log out successfully!",
      user: {
        _id,
      },
    });
  }
);

export default { signUp, logIn, refreshAccessToken, logOut };
