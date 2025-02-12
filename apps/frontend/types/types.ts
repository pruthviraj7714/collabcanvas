

export type Shape = "RECTANGLE" | "CIRCLE" | "LINE" | "ERASER"

export interface IShape {
    type: "RECTANGLE" | "CIRCLE" | "LINE";
    x: number;
    y: number;
    radius?: number;
    height?: number;
    width?: number;
    endx: number;
    endy: number;
    strokeColor: string;
    roomId: string;
  }