import React, { useState } from "react";
import { EVENTS_COLORS } from "../../utils/calendarUtils";

const ColorPicker = ({setColor, value}) => {
  const [selectedColor, setSelectedColor] = useState(value ? EVENTS_COLORS.find(color => color.nameEnglish == value) : EVENTS_COLORS[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (color) => {
    setSelectedColor(color);
    setColor(color.nameEnglish);
    setIsOpen(false);
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <label style={{ display: "block", marginBottom: "10px" }}>Wybierz kolor:</label>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "10px",
          width: "300px",
          position: "relative",
          cursor: "pointer"
        }}
        onClick={() => setIsOpen(!isOpen)} // Otwórz/zamknij dropdown po kliknięciu
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: selectedColor.hex,
            }}
          ></div>
          <span>{selectedColor.namePolish}</span>
        </div>
        {isOpen && ( 
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              backgroundColor: "#fff",
              zIndex: 10,
            }}
          >
            {EVENTS_COLORS.map((color) => (
              <li
                key={color.hex}
                onClick={(e) => {
                  e.stopPropagation(); // Zapobiega zamknięciu dropdownu przy kliknięciu na element
                  handleSelect(color);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "5px",
                  cursor: "pointer",
                  backgroundColor: selectedColor.hex === color.hex ? "#f0f0f0" : "transparent",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
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
