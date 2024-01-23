import React, { useContext, useState } from "react";
import { SketchPicker } from "react-color";
import { TemplateContext } from "../Contexts/TemplateContext";

const ColorPicker = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#0369A1");
  const [recentColors, setRecentColors] = useState([]);
  const { setColor } = useContext(TemplateContext);

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    setRecentColors((prevColors) => {
      const updatedColors = [
        color.hex,
        ...prevColors.filter((c) => c !== color.hex).slice(0, 4),
      ];
      return updatedColors;
    });
    setColor(color.hex);
  };

  const togglePicker = () => {
    setShowPicker((prev) => !prev);
  };

  const handleRecentColorClick = (color) => {
    setSelectedColor(color);
    setShowPicker(false);
    setColor(color);
  };

  return (
    <div className="w-[90%] mx-auto mt-[4rem]">
      <div className="flex items-center">
        {recentColors.map((color, index) => (
          <div
            key={index}
            className="w-8 h-8 rounded-full cursor-pointer bg-gray-300 mr-2"
            style={{ backgroundColor: color }}
            onClick={() => handleRecentColorClick(color)}
          />
        ))}
        <button
          className="w-8 h-8 rounded-full cursor-pointer bg-gray-300 border border-gray-500 flex items-center justify-center"
          onClick={togglePicker}
        >
          +
        </button>
      </div>
      {showPicker && (
        <div className="absolute z-10 mt-2">
          <SketchPicker
            color={selectedColor}
            onChangeComplete={handleColorChange}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
