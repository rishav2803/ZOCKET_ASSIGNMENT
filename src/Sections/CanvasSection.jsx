import { useState, useRef, useEffect, useContext } from "react";
import Canvas from "../Services/Canvas";
import { templateData } from "../Utils/template";
import { TemplateContext } from "../Contexts/TemplateContext";

export default function CanvasSection() {
  const canvasRef = useRef(null);
  const { caption, cta, color, imgUrl } = useContext(TemplateContext);

  useEffect(() => {
    new Canvas(canvasRef, templateData, imgUrl, caption, cta);
    return () => {
      console.log("Hello world");
    };
  }, [caption, cta, imgUrl]);

  return (
    <div style={{ background: `${color}` }}>
      {/* <div> */}
      <canvas ref={canvasRef} height="1080px" width="1080px" />
    </div>
  );
}
