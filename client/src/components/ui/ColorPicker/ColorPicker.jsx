import { useState } from "react";
import { EVENTS_COLORS } from "../../../utils/calendarUtils";
import './ColorPicker.css'

const ColorPicker = ({setColor, value}) => {
  const [selectedColor, setSelectedColor] = useState(value ? EVENTS_COLORS.find(color => color.nameEnglish === value) || EVENTS_COLORS[0] : EVENTS_COLORS[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (color) => {
    setSelectedColor(color);
    setColor(color.nameEnglish);
    setIsOpen(false);
  };

  return (
    <div>
      <label>Wybierz kolor:</label>
      <div className="color-picker-container" onClick={() => setIsOpen(!isOpen)}>
        <div className="color-picker-inner">
          <div className="color-dot"
            style={{
              backgroundColor: selectedColor.hex,
            }}
          ></div>

          <span>{selectedColor.namePolish}</span>
        </div>

        {isOpen && ( 
          <ul className="color-picker-select">
            {EVENTS_COLORS.map((color) => (
              <li
                key={color.hex}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(color);
                }}
                className="color-picker-select-item"
                style={{
                  backgroundColor: selectedColor.hex === color.hex ? "#f0f0f0" : "transparent"
                }}
              >
                <div className="color-dot"
                  style={{
                    backgroundColor: color.hex,
                  }}
                ></div>
                <span>{color.namePolish}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
