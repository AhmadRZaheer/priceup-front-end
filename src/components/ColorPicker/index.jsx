import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { SketchPicker } from 'react-color';

const ColorPicker = ({ value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }} ref={pickerRef}>
      {/* Color Box (Acts Like Input) */}
      <div
        style={{
          backgroundColor: value,
          width: "120px",
          height: "30px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
        onClick={() => setShowPicker(true)} // Open Picker on Click
      />

      {/* Color Picker (Only Shows on Click) */}
      {showPicker && (
        <div
          style={{
            position: "absolute",
            zIndex: 1000,
            top: "50px",
            left: 0,
          }}
        >
          <SketchPicker
            color={value}
            onChange={(color) => onChange(color.hex)}
            presetColors={['#8477da','#F95500','#FFFFFF','#000000']}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
