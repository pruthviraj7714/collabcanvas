import WebSocket, { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config/config";
import prisma from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

function verifyUser(token: string) {
  const isVerified = jwt.verify(token, JWT_SECRET as string);

  if (isVerified) {
    return (isVerified as JwtPayload).userId;
  }
  return null;
}

interface User {
  ws: WebSocket;
  userId: string;
  rooms: string[];
}

const users: User[] = [];

const joinRoom = (payload: any, ws: WebSocket, userId: string) => {
  const user = users.find((u) => u.ws === ws);
  user?.rooms.push(payload.roomId);
  ws.send(
    JSON.stringify({
      type: "ROOM_JOINED",
      userId,
    })
  );
};
const leaveRoom = (payload: any, ws: WebSocket, userId: string) => {
  users.filter((user) => user.ws === ws && user.rooms.includes(payload.roomId));
  ws.send(
    JSON.stringify({
      type: "ROOM_LEAVED",
      userId,
    })
  );
};

const addShape = async (payload: any, ws: WebSocket) => {
  const user = users.find(
    (user) => user.ws === ws && user.rooms.includes(payload.roomId)
  );

  if (!user) return;

  const newShape = await prisma.shape.create({
    data: {
      roomId: payload.roomId,
      type:
        payload.shape.type === "RECTANGLE"
          ? "RECTANGLE"
          : payload.shape.type === "CIRCLE"
            ? "CIRCLE"
            : payload.shape.type === "TRIANGLE"
              ? "TRIANGLE"
              : "LINE",
      x: payload.shape.x,
      y: payload.shape.y,
      text: payload.shape.text,
      secondx: payload.shape.secondx,
      secondy: payload.shape.secondy,
      thirdx: payload.shape.thirdx,
      thirdy: payload.shape.thirdy,
      strokeColor: payload.shape.strokeColor,
      height: payload.shape.height,
      width: payload.shape.width,
      radius: payload.shape.radius,
      endx: payload.shape.endx,
      endy: payload.shape.endy,
    },
  });

  users.map((user) => {
    user.ws.send(
      JSON.stringify({
        type: "SHAPE_ADDED",
        shape: newShape,
        roomId: payload.roomId,
      })
    );
  });
};

const eraseShape = async (payload: any, ws: WebSocket) => {
  const user = users.find(
    (user) => user.ws === ws && user.rooms.includes(payload.roomId)
  );

  if (!user) return;

  const shapeId = payload.shapeId;

  try {
    await prisma.shape.delete({
      where: {
        id: shapeId,
        roomId: payload.roomId,
      },
    });
  } catch (error) {
    ws.send(
      JSON.stringify({
        message: "some error occured",
        error,
      })
    );
    return;
  }

  users.map((user) => {
    user.ws.send(
      JSON.stringify({
        type: "SHAPE_ERASED",
        shapeId: shapeId,
        roomId: payload.roomId,
      })
    );
  });
};

wss.on("connection", function connection(ws, req) {
  const token = req.url?.split("?token=")[1];

  if (!token) {
    ws.send(
      JSON.stringify({
        message: "Token not found",
      })
    );
    return;
  }

  const userId = verifyUser(token);

  if (!userId) {
    return;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", function message(data) {
    const payload = JSON.parse(data as unknown as string);
    switch (payload.type) {
      case "JOIN_ROOM":
        joinRoom(payload, ws, userId);
        break;
      case "LEAVE_ROOM":
        leaveRoom(payload, ws, userId);
        break;
      case "ADD_SHAPE":
        addShape(payload, ws);
        break;
      case "ERASE_SHAPE":
        eraseShape(payload, ws);
        break;
    }
  });
});
