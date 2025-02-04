import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/common";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) : void => {
  const headers = req.headers.authorization;

  if (!headers) {
     res.status(401).json({
      message: "No Authorization Header Found",
    });
    return;
  }

  const token = headers.split(" ")[1];

  if (!token) {
     res.status(401).json({
      message: "Auth Token Not Found!",
    });
    return;
  }

  try {
    const isVerified = verify(token, JWT_SECRET ?? "") as JwtPayload;

    if (!isVerified || !isVerified.userId) {
       res.status(403).json({
        message: "Unauthorized User",
      });
      return;
    }

    req.userId = isVerified.userId;
    next();
  } catch (error) {
     res.status(403).json({
      message: "Invalid or Expired Token",
    });
    return;
  }
};
