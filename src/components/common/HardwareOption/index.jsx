// import { Delete } from "@mui/icons-material";
import {
    Box,
    // CircularProgress,
    FormControl,
    // FormControlLabel,
    // IconButton,
    // Switch,
    // TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
// import DeleteIcon from "@/Assets/Delete-Icon.svg";
import CustomToggle from "@/components/ui-components/Toggle";
import CustomInputField from "@/components/ui-components/CustomInput";
// import DeleteModal from "../Modal/deleteModal";

const HardwareOption = ({
    index,
    option,
    handleUpdateOption,
    // handleDeleteOption,
}) => {
    // const LoadingForDelete = false;
    const [optionState, setOptionState] = useState(option);

    useEffect(() => {
        const scrollToIndex = localStorage.getItem("scrollToIndex");
        if (scrollToIndex) {
            const updateButton = document.getElementById(scrollToIndex);
            if (updateButton) {
                updateButton.scrollIntoView({ behavior: "smooth" });
                localStorage.removeItem("scrollToIndex");
            }
        }
    }, []);

    const handleStatusChange = (event) => {
        const value = event.target.checked;
        setOptionState({ ...optionState, status: value });
        handleUpdateOption({ ...optionState, status: value });

    };
    const handleCostChange = (event) => {
        const value = event.target.value;
        if (value.length > 0) {
            setOptionState({ ...optionState, cost: Number(value) });
            handleUpdateOption({ ...optionState, cost: Number(value) });
        }
    };
    return (
        <Box key={index} id={optionState._id}>
            <Box
                style={{
                    display: "flex",
                    gap: 4,
                    alignContent: "center",
                    paddingTop: 4,
                    paddingBottom: 4,
                }}
            >
                <Box
                    style={{
                        width: "250px",
                        padding: 4,
                        alignItems: "center",
                    }}
                ></Box>

                <Box
                    style={{
                        width: "250px",
                        padding: 4,
                        alignItems: "center",
                    }}
                >
                    <Typography>Cost</Typography>
                    <CustomInputField
                        size="small"
                        variant="outlined"
                        name="cost"
                        type="number"
                        inputProps={{
                            min: 0
                        }}
                        placeholder="Cost"
                        style={{ width: "100%" }}
                        value={optionState.cost}
                        onChange={(event) => handleCostChange(event)}
                    />
                </Box>
                <Box
                    style={{
                        maxWidth: "400px",
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {optionState?.thickness && <Box
                        style={{
                            width: "150px",
                            padding: 4,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <FormControl style={{ width: "100%" }} size="small">
                            <Typography>Thickness</Typography>
                            <Typography variant="h6">{optionState?.thickness}</Typography>
                        </FormControl>
                    </Box>}

                    <Box style={{ marginTop: "18px" }}>
                        <CustomToggle
                            checked={optionState.status}
                            onChange={(event) => handleStatusChange(event)}
                            // onBlur={formik.handleBlur}
                            name="status"
                        />
                    </Box>
                    {/* <Box sx={{ display: "flex" }}>
                        {LoadingForDelete ? (
                            <CircularProgress size={24} color="warning" />
                        ) : (
                            <IconButton
                                type="button"
                                onClick={() => handleDeleteOption(optionState._id)}
                                sx={{ mt: 3.2 }}
                            >
                                <img src={DeleteIcon} alt="delete icon" />
                            </IconButton>
                        )}

                    </Box> */}
                </Box>
            </Box>
        </Box>
    );
};

export default HardwareOption;
