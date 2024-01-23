import { useState } from "react";
import CanvasSection from "./Sections/CanvasSection";
import CustomizationSection from "./Sections/CustomizationSection";
import { templateData } from "./Utils/template";

export default function App() {
  return (
    <div className="flex">
      <CanvasSection templateData={templateData} />
      <CustomizationSection />
    </div>
  );
}
