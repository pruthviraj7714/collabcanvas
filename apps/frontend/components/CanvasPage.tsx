"use client";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  Circle,
  PenLine,
  RectangleHorizontal,
  Eraser,
} from "lucide-react";
import type { Shape } from "../types/types";

const COLORS = [
  "#f44336",
  "#2196f3",
  "#4caf50",
  "#ffeb3b",
  "#ffffff",
  "#9c27b0",
];

interface DrawingState {
  isDrawing: boolean;
  startX: number;
  startY: number;
}

const CanvasPage = ({
  roomId,
  intialShapes,
}: {
  roomId: string;
  intialShapes: any[];
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [selectedShape, setSelectedShape] = useState<Shape>("RECTANGLE");
  const [strokeColor, setStrokeColor] = useState("#ffffff");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [shapes, setShapes] = useState(intialShapes);
  const drawingState = useRef<DrawingState>({
    isDrawing: false,
    startX: 0,
    startY: 0,
  });
  const distanceFromPointToLine = (
    x: number,
    y: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) {
      param = dot / lenSq;
    }

    let xx, yy;

    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }

    const dx = x - xx;
    const dy = y - yy;

    return Math.sqrt(dx * dx + dy * dy);
  };

  const isPointNearRectangle = (
    x: number,
    y: number,
    rectX: number,
    rectY: number,
    rectWidth: number,
    rectHeight: number,
    tolerance: number = 5
  ) => {
    const left = Math.min(rectX, rectX + rectWidth);
    const right = Math.max(rectX, rectX + rectWidth);
    const top = Math.min(rectY, rectY + rectHeight);
    const bottom = Math.max(rectY, rectY + rectHeight);

    const nearHorizontalEdge =
      (x >= left - tolerance &&
        x <= right + tolerance &&
        (Math.abs(y - top) <= tolerance ||
          Math.abs(y - bottom) <= tolerance)) ||
      (y >= top - tolerance &&
        y <= bottom + tolerance &&
        (Math.abs(x - left) <= tolerance || Math.abs(x - right) <= tolerance));

    return nearHorizontalEdge;
  };

  useEffect(() => {
    const ws = new WebSocket(
      `ws://localhost:8080?token=${localStorage.getItem("userToken")}`
    );

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "JOIN_ROOM",
          roomId,
        })
      );
    };

    ws.onmessage = (e) => {
      const payload = JSON.parse(e.data);
      console.log(payload);

      if (payload.type === "SHAPE_ADDED") {
        setShapes((prev) => [...prev, payload.shape]);
      } else if (payload.type === "SHAPE_ERASED") {
        setShapes((prev) =>
          prev.filter((shape) => shape.id !== payload.shapeId)
        );
      };
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            type: "LEAVE_ROOM",
            roomId,
          })
        );
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    socket?.send(
      JSON.stringify({
        type: "JOIN_ROOM",
        roomId,
      })
    );

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;
    redrawCanvas();

    return () => {
      socket?.send(
        JSON.stringify({
          message: "LEAVE_ROOM",
          roomId,
        })
      );
    };
  }, []);

  useEffect(() => {
    redrawCanvas();
  }, [shapes]);

  const redrawCanvas = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.forEach((shape) => {
      ctx.strokeStyle = shape.strokeColor;

      switch (shape.type) {
        case "RECTANGLE":
          ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
          break;
        case "CIRCLE":
          ctx.beginPath();
          ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
          ctx.stroke();
          break;
        case "LINE":
          ctx.beginPath();
          ctx.moveTo(shape.x, shape.y);
          ctx.lineTo(shape.endx, shape.endy);
          ctx.stroke();
          break;
      }
    });
  };

  const getMouseCoordinates = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMouseCoordinates(e as unknown as MouseEvent);
    drawingState.current = {
      isDrawing: true,
      startX: x,
      startY: y,
    };
  };

  const handleMouseMove = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingState.current.isDrawing) return;

    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    const { x, y } = getMouseCoordinates(e as unknown as MouseEvent);
    const { startX, startY } = drawingState.current;

    redrawCanvas();

    ctx.strokeStyle = strokeColor;

    switch (selectedShape) {
      case "RECTANGLE": {
        const width = x - startX;
        const height = y - startY;
        ctx.strokeRect(startX, startY, width, height);
        break;
      }
      case "CIRCLE": {
        const radius = Math.sqrt(
          Math.pow(x - startX, 2) + Math.pow(y - startY, 2)
        );
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      }
      case "LINE": {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
        break;
      }
      case "ERASER": {
        const newShapes = shapes.filter((shape) => {
          if (shape.type === "RECTANGLE") {
            return !isPointNearRectangle(
              x,
              y,
              shape.x,
              shape.y,
              shape.width,
              shape.height
            );
          } else if (shape.type === "LINE") {
            const distance = distanceFromPointToLine(
              x,
              y,
              shape.x,
              shape.y,
              shape.endx,
              shape.endy
            );
            return distance > 5;
          } else if (shape.type === "CIRCLE") {
            return !(
              Math.sqrt(Math.pow(x - shape.x, 2) + Math.pow(y - shape.y, 2)) <=
              shape.radius
            );
          }
          return true;
        });

        if (newShapes.length !== shapes.length) {
          const removedShapes = shapes.filter(
            (shape) => !newShapes.includes(shape)
          );

          if (removedShapes.length > 0) {
            for (const shape of removedShapes) {
              socket?.send(
                JSON.stringify({
                  type: "ERASE_SHAPE",
                  roomId,
                  shapeId: shape.id,
                })
              );
            }
          }
        }
        break;
      }
    }
  };

  const handleMouseUp = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingState.current.isDrawing) return;

    const { x, y } = getMouseCoordinates(e as unknown as MouseEvent);
    const { startX, startY } = drawingState.current;

    if (selectedShape !== "ERASER") {
      const newShape = {
        type: selectedShape,
        x: startX,
        y: startY,
        strokeColor,
        width: x - startX,
        height: y - startY,
        radius: Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2)),
        endx: x,
        endy: y,
      };

      try {
        // await axios.post(`${BACKEND_URL}/room/add-shape/${roomId}`, newShape);
        socket?.send(
          JSON.stringify({
            type: "ADD_SHAPE",
            roomId,
            shape: newShape,
          })
        );
        // setShapes((prev) => [...prev, newShape]);
      } catch (error) {
        console.error("Failed to save shape:", error);
      }
    }

    drawingState.current.isDrawing = false;
  };

  return (
    <div className="relative bg-[#121212] min-h-screen">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex justify-center items-center gap-2 p-2 bg-[#1e1e1e] rounded-lg shadow-lg">
          <ToolButton
            icon={<RectangleHorizontal />}
            isSelected={selectedShape === "RECTANGLE"}
            onClick={() => setSelectedShape("RECTANGLE")}
          />
          <ToolButton
            icon={<Circle />}
            isSelected={selectedShape === "CIRCLE"}
            onClick={() => setSelectedShape("CIRCLE")}
          />
          <ToolButton
            icon={<PenLine />}
            isSelected={selectedShape === "LINE"}
            onClick={() => setSelectedShape("LINE")}
          />
          <ToolButton
            icon={<Eraser />}
            isSelected={selectedShape === "ERASER"}
            onClick={() => setSelectedShape("ERASER")}
          />
        </div>
      </div>
      <div className="absolute left-4 top-4 bg-[#1e1e1e] rounded-lg shadow-lg p-4 z-10">
        <h2 className="text-white mb-2 font-semibold">Stroke Color</h2>
        <div className="grid grid-cols-3 gap-2">
          {COLORS.map((color) => (
            <ColorButton
              key={color}
              color={color}
              isSelected={strokeColor === color}
              onClick={() => setStrokeColor(color)}
            />
          ))}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="bg-[#121212]"
      />
    </div>
  );
};

interface ToolButtonProps {
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const ToolButton = ({ icon, isSelected, onClick }: ToolButtonProps) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-md transition-colors ${
      isSelected ? "bg-[#3a3a3a]" : "hover:bg-[#2a2a2a]"
    }`}
  >
    {icon}
  </button>
);

interface ColorButtonProps {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

const ColorButton = ({ color, isSelected, onClick }: ColorButtonProps) => (
  <button
    onClick={onClick}
    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
      isSelected ? "scale-110 ring-2 ring-white" : ""
    }`}
    style={{ backgroundColor: color }}
  >
    {isSelected && <Check className="text-black" size={16} />}
  </button>
);

export default CanvasPage;
