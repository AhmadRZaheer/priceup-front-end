import { Box, Button } from "@mui/material";
import { setNavigation } from "../../redux/estimateCalculations";
import { useDispatch } from "react-redux";

const QuotesFooter = ({ navigateNext, navigateBack }) => {
    const dispatch = useDispatch();
    return (<Box
        sx={{
            display: { md: "none", xs: "flex" },
            gap: 2,
            justifyContent: "center",
            width: "93%",
            paddingX: 2,
            paddingY: 2,
            position: "fixed",
            bottom: 0,
            backgroundColor: "#100d24",
            borderTop: "1px solid #423f57",
        }}
    >
        <Box sx={{ width: { md: "150px", xs: "50%" } }}>
            <Button
                fullWidth
                onClick={() => {
                    dispatch(setNavigation(navigateBack));
                }}
                sx={{
                    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                    color: "#344054",
                    textTransform: "initial",
                    border: "1px solid #D0D5DD",
                    backgroundColor: { md: "transparent", xs: "white" },
                }}
            >
                {" "}
                Back
            </Button>
        </Box>

        <Box sx={{ width: { md: "150px", xs: "50%" } }}>
            <Button
                fullWidth
                // disabled={selectedContent?.hardwareFinishes === null}
                variant="contained"
                // onClick={handleBoxClick}
                sx={{
                    backgroundColor: "#8477da",
                    "&:hover": {
                        backgroundColor: "#8477da",
                    },
                }}
            >
                {" "}
                Next
            </Button>
        </Box>
    </Box>)
};

export default QuotesFooter;