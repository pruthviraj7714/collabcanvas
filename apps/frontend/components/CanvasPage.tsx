"use client";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  Circle,
  PenLine,
  RectangleHorizontal,
  Eraser,
} from "lucide-react";
import type { IShape, Shape } from "../types/types";
import axios from "axios";
import { BACKEND_URL } from "../config/config";

const COLORS = [
  "#f44336",
  "#2196f3",
  "#4caf50",
  "#ffeb3b",
  "#ffffff",
  "#9c27b0",
];

const CanvasPage = ({ roomId, shapes }: { roomId: string; shapes: any[] }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedShape, setSelectedShape] = useState<Shape>("RECT");
  const [strokeColor, setStrokeColor] = useState("#ffffff");

  async function InsertShapeOnCanvas(shape: any, roomId: string) {
    try {
      await axios.post(`${BACKEND_URL}/room/add-shape/${roomId}`, shape);
    } catch (error: any) {
      alert(error.message);
    }
  }
  async function eraseShape(shape : any) {
    alert("done");
  }

  function SetShapesonCanvas(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    shapes: IShape[]
  ) {
    if (!ctx) return;
    if (shapes.length < 1) return;

    for (let i = 0; i < shapes.length; i++) {
      ctx.strokeStyle = shapes[i].strokeColor;
      if (shapes[i].type === "RECTANGLE") {
        ctx?.strokeRect(
          shapes[i].x,
          shapes[i].y,
          shapes[i].width,
          shapes[i].height
        );
      } else if (shapes[i].type === "CIRCLE") {
        ctx.beginPath();
        ctx.arc(shapes[i].x, shapes[i].y, shapes[i].radius, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (shapes[i].type === "LINE") {
        ctx.beginPath();
        ctx.moveTo(shapes[i].x, shapes[i].y);
        ctx.lineTo(shapes[i].endx, shapes[i].endy);
        ctx.stroke();
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      SetShapesonCanvas(canvas, ctx, shapes);

      let startX = 0;
      let startY = 0;
      let height = 0;
      let width = 0;
      let radius = 0;
      let isClicked = false;
      let currShapeData = {
        shape: "",
        xcoor: 0,
        ycoor: 0,
        radius: 0,
        height: 0,
        width: 0,
        endx: 0,
        endy: 0,
        strokeColor: "",
      };

      canvas.onmousedown = (e) => {
        isClicked = true;
        startX = e.clientX - canvas.offsetLeft;
        startY = e.clientY - canvas.offsetTop;
      };

      canvas.onmousemove = (e) => {
        if (isClicked) {
          ctx?.beginPath();
          ctx.strokeStyle = strokeColor;
          if (selectedShape === "RECT") {
            width = e.clientX - canvas.offsetLeft - startX;
            height = e.clientY - canvas.offsetTop - startY;
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
            SetShapesonCanvas(canvas, ctx, shapes);
            ctx?.strokeRect(startX, startY, width, height);
          } else if (selectedShape === "CIRCLE") {
            radius = Math.max(
              Math.abs(e.clientX - canvas.offsetLeft - startX),
              Math.abs(e.clientY - canvas.offsetTop - startY)
            );
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            SetShapesonCanvas(canvas, ctx, shapes);
            ctx.beginPath()
            ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
            ctx.stroke();
          } else if (selectedShape === "LINE") {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            SetShapesonCanvas(canvas, ctx, shapes);
            ctx.beginPath()
            ctx.moveTo(startX, startY);
            ctx.lineTo(
              e.clientX - canvas.offsetLeft,
              e.clientY - canvas.offsetTop
            );
            ctx.stroke();
          } else if (selectedShape === "ERASER") {
            for (let i = 0; i < shapes.length; i++) {
              if (shapes[i].x === e.clientX && shapes[i].y === e.clientY) {
                eraseShape(shapes[i]);
                shapes = shapes.filter((s) => s.id === shapes[i].id);
              }
            }
          }
        }
      };

      canvas.onmouseup = async (e) => {
        isClicked = false;
        if(selectedShape !== "ERASER") {
          currShapeData = {
            ...currShapeData,
            shape: selectedShape,
            height: height,
            width: width,
            endx: e.clientX - canvas.offsetLeft,
            endy: e.clientY - canvas.offsetTop,
            radius: radius,
            xcoor: startX,
            ycoor: startY,
            strokeColor: strokeColor,
          };
          await InsertShapeOnCanvas(currShapeData, roomId);
          shapes = [
            ...shapes,
            {
              x: startX,
              y: startY,
              height: height,
              width: width,
              endx: e.clientX - canvas.offsetLeft,
              endy: e.clientY - canvas.offsetTop,
              strokeColor: strokeColor,
              type: selectedShape,
              radius: radius,
            },
          ];
        }
      };
    }
  }, [canvasRef, strokeColor, selectedShape, shapes, roomId]);

  return (
    <div className="relative bg-[#121212] min-h-screen">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex justify-center items-center gap-2 p-2 bg-[#1e1e1e] rounded-lg shadow-lg">
          <ToolButton
            icon={<RectangleHorizontal />}
            isSelected={selectedShape === "RECT"}
            onClick={() => setSelectedShape("RECT")}
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
        height={window.innerHeight}
        width={window.innerWidth}
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

const ToolButton: React.FC<ToolButtonProps> = ({
  icon,
  isSelected,
  onClick,
}) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-md transition-colors ${isSelected ? "bg-[#3a3a3a]" : "hover:bg-[#2a2a2a]"}`}
  >
    {icon}
  </button>
);

interface ColorButtonProps {
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

const ColorButton: React.FC<ColorButtonProps> = ({
  color,
  isSelected,
  onClick,
}) => (
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
