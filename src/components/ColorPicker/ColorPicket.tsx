import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

const ColorPicker = ({ color, setColor }) => {
    return (
      <div>
        <HexColorPicker color={color} onChange={setColor} />
        <HexColorInput color={color} onChange={setColor} placeholder="Type a color" prefixed alpha />
      </div>
    );
  };
  

export default ColorPicker;