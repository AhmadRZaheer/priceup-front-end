import { Button, IconButton, Tooltip } from "@mui/material";
import React, { useState, useEffect } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTop = ({ background, color }) => {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    const scrollDuration = 500;
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  return (
    <>
      {showButton && (
        <Tooltip title="Scroll To Top" placement="top">
          <Button
            onClick={scrollToTop}
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              color: color,
              backgroundColor: background,
              border: "none",
              // borderRadius: "50%",
              width: "48px",
              height: "48px",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              fontSize: "18px",
              ":hover": {
                backgroundColor: background,
              },
            }}
          >
            <KeyboardArrowUpIcon sx={{fontSize:'42px'}} />
          </Button>
        </Tooltip>
      )}
    </>
  );
};

export default ScrollToTop;
