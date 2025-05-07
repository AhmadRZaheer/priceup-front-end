import {
  useEffect,
  useState,
} from 'react';

import {
  AddCircleOutline,
  RemoveCircleOutline,
} from '@mui/icons-material';
import {
  Box,
  Typography,
} from '@mui/material';

const OptionWithCounter = ({
  counter,
  type,
  item,
  status,
  handleChange,
  isSelected,
}) => {
  const [count, setCount] = useState(counter);
  const handleCountSet = (newVal, event) => {
    event.stopPropagation();
    if (newVal >= 0 && newVal <= 100 && status) {
      setCount(newVal);
      handleChange(type, { item, counter: newVal });
    }
  };
  useEffect(() => {
    if (counter) {
      setCount(counter);
    }
  }, [counter]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: {sm:"space-around",xs:'none'},
        gap: 1,
        color: { md: "#000000  ", xs: "white" },
        alignSelf: "flex-end",
      }}
    >
      <AddCircleOutline
        onClick={(event) => handleCountSet(count + 1, event)}
        sx={{ color: isSelected ? "#000000" : "#5D6164",fontSize:{sm:'24px',xs:'20px'} }}
      />
      <Typography
        className="counter-txt"
        sx={{ color: isSelected ? "black" : "black" }}
      >
        {count}
      </Typography>
      <RemoveCircleOutline
        onClick={(event) => handleCountSet(count - 1, event)}
        sx={{ color: isSelected ? "black" : "#5D6164",fontSize:{sm:'24px',xs:'20px'}}}
      />
    </Box>
  );
};

export default OptionWithCounter;
