import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setCounters } from "@/redux/estimateCalculations";
import { useState } from "react";

const OptionWithCounter = ({ counter = 0, type, item, status, handleChange ,isSelected}) => {
    const disaptch = useDispatch();
    const [count, setCount] = useState(counter);
    const handleCountSet = (newVal, event) => {
        event.stopPropagation();
        if (newVal >= 0 && newVal <=100 && status) {
            setCount(newVal)
            // disaptch(setCounters({ item: item, type: type, value: newVal }));
            handleChange(type,{item,counter:newVal})
        }
    }
    return (<Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 1,
            color: { md: "#000000  ", xs: "white" },
            alignSelf: "flex-end",
        }}
    >
        <AddCircleOutline
            onClick={(event) =>
                handleCountSet(count + 1, event)
            }
            sx={{ color: isSelected ? "#000000" : "#5D6164" }}
        />
        <Typography className='counter-txt' sx={{ color: isSelected ? "black" : "black" }}>{count}</Typography>
        <RemoveCircleOutline
            onClick={(event) =>
                handleCountSet(count - 1, event)
            }
            sx={{ color: isSelected ? "black" : "#5D6164"}}
        />
    </Box>)
}

export default OptionWithCounter;