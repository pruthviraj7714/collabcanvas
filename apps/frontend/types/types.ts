

export type Shape = "RECT" | "CIRCLE" | "LINE"

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