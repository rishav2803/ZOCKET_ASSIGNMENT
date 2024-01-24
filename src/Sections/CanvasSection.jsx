import { useState, useRef, useEffect, useContext } from "react";
import Canvas from "../Services/Canvas";
import { templateData } from "../Utils/template";
import { TemplateContext } from "../Contexts/TemplateContext";

export default function CanvasSection() {
  const canvasRef = useRef(null);
  const { debouncedCaption ,debouncedCta,cta, color, imgUrl } = useContext(TemplateContext);
  const [canvasInstance, setCanvasInstance] = useState(null);

  useEffect(() => {
    if (canvasInstance) {
      canvasInstance.updateCanvas(debouncedCaption,debouncedCta,imgUrl,color);
    } else {
      setCanvasInstance(new Canvas(canvasRef, templateData, imgUrl, debouncedCaption, debouncedCta,color));
    }
    return () => {
      console.log("Hello world");
    };
  }, [debouncedCaption,color,debouncedCta, imgUrl]);

  return (
    <div >
      {/* <div> */}
      <canvas ref={canvasRef} height="1080px" width="1080px" />
    </div>
  );
}
