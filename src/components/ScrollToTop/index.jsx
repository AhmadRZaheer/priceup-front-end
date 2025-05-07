import React, {
  useEffect,
  useState,
} from 'react';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Button,
  Tooltip,
} from '@mui/material';

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
              bottom: {sm:"20px",xs:'10px'},
              right: {sm:"20px",xs:'10px'},
              color: color,
              backgroundColor: background,
              border: "none",
              // borderRadius: "50%",
              width: {sm:"48px",xs:'42px'},
              height:  {sm:"48px",xs:'42px'},
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              minWidth: {sm:"55px",xs:'38px'},
              fontSize: "18px",
              ":hover": {
                backgroundColor: background,
              },
            }}
          >
            <KeyboardArrowUpIcon sx={{fontSize:{sm:"38px",xs:'30px'},}} />
          </Button>
        </Tooltip>
      )}
    </>
  );
};

export default ScrollToTop;
