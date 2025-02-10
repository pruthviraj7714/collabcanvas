"use client";
import { useEffect, useRef } from "react";

const CanvasPage = ({ roomId }: { roomId: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef?.current) {
        console.log(canvasRef.current);
        
      const ctx = canvasRef.current.getContext("2d");

      if(!ctx) return;
      let startX = 0;
      let startY = 0;
      let height = 0;
      let width = 0;
      let isClicked = false;

      canvasRef.current.onmousedown = (e) => {
        isClicked = true;
        startX = e.clientX;
        startY = e.clientY;
      };

      canvasRef.current.onmousemove = (e) => {
        if(isClicked) {
          ctx?.beginPath();
          width = e.clientX - startX;
          height = e.clientY - startY;
          ctx.strokeStyle = "white";
          ctx?.clearRect(0, 0, canvasRef?.current?.width as number, canvasRef?.current?.height as number);
          ctx?.strokeRect(startX, startY, width, height)
            // console.log(e.clientX + "," + e.clientY) ;
        }
        
      };

      canvasRef.current.onmouseup = (e) => {
        isClicked=false;
      };
    }
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      height={1440}
      width={1440}
      className=" bg-slate-900"
    />
  );
};

export default CanvasPage;
