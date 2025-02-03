import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers.authorization;

  if (!headers) {
    return res.status(401).json({
      message: "No Authorization Header Found",
    });
  }

  const token = headers.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Auth Token Not Found!",
    });
  }

  try {
    const isVerified = verify(token, JWT_SECRET ?? "") as JwtPayload;

    if (!isVerified || !isVerified.userId) {
      return res.status(403).json({
        message: "Unauthorized User",
      });
    }

    req.userId = isVerified.userId;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid or Expired Token",
    });
  }
};
