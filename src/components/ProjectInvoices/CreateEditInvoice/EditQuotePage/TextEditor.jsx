import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Box } from "@mui/material";
import {
  AlignHorizontalCenter,
  AlignHorizontalLeft,
  AlignHorizontalRight,
  FormatListBulleted,
  FormatListNumbered,
} from "@mui/icons-material";

// Font size whitelist
const fontSizeArr = [
  "8px",
  "9px",
  "10px",
  "12px",
  "14px",
  "16px",
  "20px",
  "24px",
  "32px",
  "42px",
  "54px",
  "68px",
  "84px",
  "98px",
];
export const fontFamilies = [
  { label: "Sans", value: "sans" },
  { label: "Sans Serif", value: "sans-serif" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Courier New", value: "Courier New" },
];
// Register font size with Quill
const Size = Quill.import("attributors/style/size");
Size.whitelist = fontSizeArr;
Quill.register(Size, true);

const Font = Quill.import("attributors/style/font");
Font.whitelist = fontFamilies.map((font) => font.value);
Quill.register(Font, true);

const Align = Quill.import("attributors/style/align");
Quill.register(Align, true);

const TextBlock = ({text,setText}) => {

  const [formats, setFormats] = useState({});
  const [anchorPosition, setAnchorPosition] = useState(null);
  const editorRef = useRef(null);
  const popoverRef = useRef(null);

  const handleTextChange = (value) => {
    setText(value);
  };

  useEffect(() => {
    const quill = editorRef.current?.getEditor();

    if (quill) {
      quill.focus();
    }

    if (quill) {
      quill.on("selection-change", (range) => {
        if (range && range.length > 0) {
          const bounds = quill.getBounds(range.index, range.length);
          // Calculate the position for the popover relative to the editor
          const container = quill.root.getBoundingClientRect();
          setAnchorPosition({
            top:
              container.top + bounds.top + bounds.height + window.scrollY + 50,
            left: container.left + bounds.left + window.scrollX - 240,
          });
          const currentFormats = quill.getFormat(range);
          setFormats(currentFormats);
        } else {
          setAnchorPosition(null);
        }
      });
    }

    const handleClickOutside = (event) => {
      if (
        anchorPosition &&
        editorRef.current &&
        popoverRef.current &&
        !editorRef.current.getEditor().root.contains(event.target) &&
        !popoverRef.current.contains(event.target)
      ) {
        setAnchorPosition(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorPosition]);

  const toggleFormat = (format) => {
    const quill = editorRef.current?.getEditor();
    if (quill) {
      const isActive = formats[format];
      quill.format(format, !isActive);
      setFormats((prevFormats) => ({
        ...prevFormats,
        [format]: !isActive,
      }));
    }
  };

  const applyHeader = (value) => {
    const quill = editorRef.current?.getEditor();
    if (quill) {
      quill.format("header", value);
      setFormats((prevFormats) => ({
        ...prevFormats,
        header: value,
      }));
    }
  };

  const applyFont = (value) => {
    const quill = editorRef.current?.getEditor();
    if (quill) {
      quill.format("font", value);
      setFormats((prevFormats) => ({
        ...prevFormats,
        font: value,
      }));
    }
  };

  const applyFontSize = (size) => {
    const quill = editorRef.current?.getEditor();
    if (quill) {
      const range = quill.getSelection();
      if (range && range.length > 0) {
        quill.format("size", `${size}px`);
      } else {
        console.warn("No text selected");
      }
    }
  };

  const toggleAlignment = (align) => {
    const quill = editorRef.current?.getEditor();
    if (quill) {
      if (align === "left") {
        quill.format("align", null);
        setFormats((prevFormats) => ({
          ...prevFormats,
          align: null,
        }));
      } else {
        quill.format("align", align);
        setFormats((prevFormats) => ({
          ...prevFormats,
          align: align,
        }));
      }
    }
  };

  const toggleList = (listType) => {
    const quill = editorRef.current?.getEditor();
    if (quill) {
      const isActive = formats.list === listType;
      quill.format("list", isActive ? false : listType);
      setFormats((prevFormats) => ({
        ...prevFormats,
        list: isActive ? null : listType,
      }));
    }
  };

  const applyTextColor = (color) => {
    const quill = editorRef.current?.getEditor();
    if (quill) {
      quill.format("color", color);
      setFormats((prevFormats) => ({
        ...prevFormats,
        color,
      }));
    }
  };

  console.log(text, "texttexttexttexttext");
  return (
    <>
      <Box>
        <div dangerouslySetInnerHTML={{ __html: text }} />
      </Box>
      <Box sx={{ border: "1px solid rgb(204, 204, 204)" }}>
        <Box>
          <Box
            ref={popoverRef}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              padding: 0.5,
              pointerEvents: "auto", // Allow interactions within the popover
              backgroundColor: "none",
              position: "relative",
            }}
          >
            <select
              onChange={(e) => applyHeader(parseInt(e.target.value) || false)}
              value={typeof formats.header === "number" ? formats.header : 0}
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: "4px",
                margin: 0,
              }}
            >
              <option value="0">Paragraph</option>
              <option value="1">Heading 1</option>
              <option value="2">Heading 2</option>
              <option value="3">Heading 3</option>
            </select>
            <select
              onChange={(e) => applyFontSize(parseInt(e.target.value))}
              value={
                formats.size ? parseInt(formats.size.replace("px", "")) : 16 // Default to 16px
              }
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: "4px",
                margin: 0,
              }}
            >
              {fontSizeArr.map((size) => (
                <option key={size} value={parseInt(size)}>
                  {size}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => applyFont(e.target.value)}
              value={
                typeof formats.font === "string" ? formats.font : "default"
              }
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: "4px",
              }}
            >
              {fontFamilies.map((font) => (
                <option
                  key={font.value}
                  value={font.value}
                  style={{ fontFamily: font.value }}
                >
                  {font.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => toggleFormat("bold")}
              style={{ backgroundColor: formats.bold ? "#ddd" : "transparent" }}
            >
              B
            </button>
            <button
              type="button"
              onClick={() => toggleFormat("italic")}
              style={{
                backgroundColor: formats.italic ? "#ddd" : "transparent",
              }}
            >
              I
            </button>
            <button
              type="button"
              onClick={() => toggleFormat("underline")}
              style={{
                backgroundColor: formats.underline ? "#ddd" : "transparent",
              }}
            >
              U
            </button>
            <button
              type="button"
              onClick={() => toggleFormat("strike")}
              style={{
                backgroundColor: formats.strike ? "#ddd" : "transparent",
              }}
            >
              S
            </button>
            {/* Text Alignment */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleAlignment("left");
              }}
              type="button"
            >
              <AlignHorizontalLeft
                icon="line-md:align-left"
                width="24"
                height="24"
              />
            </button>{" "}
            <button type="button" onClick={() => toggleAlignment("center")}>
              {" "}
              <AlignHorizontalCenter
                icon="line-md:align-center"
                width="24"
                height="24"
              />
            </button>
            <button type="button" onClick={() => toggleAlignment("right")}>
              {" "}
              <AlignHorizontalRight
                icon="line-md:align-right"
                width="24"
                height="24"
              />
            </button>
            {/* Lists */}
            <button type="button" onClick={() => toggleList("bullet")}>
              <FormatListBulleted
                icon="heroicons:list-bullet-20-solid"
                width="20"
                height="20"
              />
            </button>
            <button type="button" onClick={() => toggleList("ordered")}>
              <FormatListNumbered
                icon="ri:list-ordered"
                width="24"
                height="24"
              />
            </button>
            {/* Text Color */}
            <input
              type="color"
              onChange={(e) => applyTextColor(e.target.value)}
              value={formats.color || "#000000"}
              style={{
                width: "40px",
                height: "40px",
                margin: 0,
                cursor: "pointer",
                padding: "2px",
              }}
            />
          </Box>
        </Box>
        <ReactQuill
          ref={editorRef}
          theme="snow"
          value={text}
          onChange={handleTextChange}
          modules={{ toolbar: false }}
          style={{
            border: "none",
            height: "100%",
            width: "100%",
          }}
        />
      </Box>
    </>
  );
};

export default TextBlock;
