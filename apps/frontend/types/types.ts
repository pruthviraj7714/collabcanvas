

export type Shape = "RECTANGLE" | "CIRCLE" | "LINE" | "TRIANGLE" | "ERASER"

export interface IShape {
    type: "RECTANGLE" | "CIRCLE" | "LINE" | "TRIANGLE" ;
    x: number;
    y: number;
    secondx?: number;
    secondy?: number;
    thirdx?: number;
    thirdy?: number;
    radius?: number;
    height?: number;
    width?: number;
    endx?: number;
    endy?: number;
    strokeColor: string;
    roomId: string;
  }