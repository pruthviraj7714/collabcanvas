import prisma from "@repo/db/client";
import { createRoomSchema, addShapeSchema } from "@repo/schemas";
import { Request, response, Response, Router } from "express";
import { userMiddleware } from "../middlewares/userMiddleware";

export const roomRouter: Router = Router();

roomRouter.post(
  "/",
  userMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const parsedBody = createRoomSchema.safeParse(req.body);

      if (!parsedBody.success) {
        res.status(400).json({
          message: "Invalid Inputs",
          error: parsedBody.error.format(),
        });
        return;
      }

      const { slug } = parsedBody.data;

      const isSlugAlreadyExists = await prisma.room.findUnique({
        where: {
          slug,
        },
      });

      if (isSlugAlreadyExists) {
        res.status(400).json({
          message: "Slug with this name already exists!",
        });
        return;
      }

      const room = await prisma.room.create({
        data: {
          slug,
          adminId: req.userId!,
        },
      });

      res.status(201).json({
        room,
        message: "Room Successfully Created",
      });
      return;
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
      });
      return;
    }
  }
);

roomRouter.delete(
  "/delete/:roomId",
  userMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const roomId = req.params.roomId;

      const room = await prisma.room.findUnique({
        where: { id: roomId, adminId : req.userId },
      });

      if (!room) {
        res.status(404).json({ message: "Room not found!" });
        return;
      }

      if (room.adminId !== req.userId) {
        res
          .status(403)
          .json({ message: "You are not authorized to delete this room" });
        return;
      }

      await prisma.room.delete({ where: { id: roomId } });

      res.status(200).json({ message: "Room Successfully Deleted" });
    } catch (error) {
      console.error("Error deleting room:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

roomRouter.get(
  "/:roomId",
  userMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const roomId = req.params.roomId;

      const room = await prisma.room.findFirst({
        where: {
          id: roomId,
        },
      });

      if (!room) {
        res.status(400).json({
          message: "Room with given Id not foun!",
        });
        return;
      }

      res.status(200).json({
        room,
      });
      return;
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
      return;
    }
  }
);

roomRouter.get(
  "/all",
  userMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const rooms = await prisma.room.findMany({});
      res.status(200).json(rooms);
      return;
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
      });
      return;
    }
  }
);

roomRouter.post(
  "/add-shape/:roomId",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const roomId = req.params.roomId;

      if (!roomId) {
        res.status(400).json({
          message: "Room Id not found!",
        });
        return;
      }

      const parsedBody = addShapeSchema.safeParse(req.body);

      if (!parsedBody.success) {
        res.status(400).json({
          message: "Invalid Inputs",
          error: parsedBody.error.format(),
        });
        return;
      }

      const { height, width, radius, shape, strokeColor, xcoor, ycoor, endx, endy } =
        parsedBody.data;

      await prisma.shape.create({
        data: {
          roomId,
          type:
            shape === "RECT"
              ? "RECTANGLE"
              : shape === "CIRCLE"
                ? "CIRCLE"
                : "LINE",
          x: xcoor,
          y: ycoor,
          strokeColor: strokeColor,
          height: height,
          width: width,
          radius: radius,
          endx,
          endy
        },
      });

      res.status(200).json({
        message : "Shape Successfully Added on Canvas"
      })
      return;
    } catch (error) {
      console.log(error);
      
      res.status(500).json({
        message: "Internal Server Error",
      });
      return;
    }
  }
);
