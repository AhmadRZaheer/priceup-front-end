import { ChevronLeftOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getQuoteState, setNavigation } from "../../redux/estimateCalculations";

const QuotesHeader = ({navigateTo}) => {
    const dispatch = useDispatch();
    const quoteState = useSelector(getQuoteState);

    return (<Box sx={{width:"100%",zIndex:1,position:'relative'}}>
        <Box
        sx={{
            display: { md: "none", xs: "flex" },
            zIndex: 2,
            justifyContent: { md: "center", xs: "start" },
            background: "#18133b",
            width: "100%",
            color: "white",
            paddingY: 1.2,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginTop: 7.6,
        }}
    >
        <Box sx={{ display: { md: "none", xs: "block" } }}>
            <ChevronLeftOutlined
                onClick={() => {
                    dispatch(setNavigation(navigateTo));
                }}
                sx={{ fontSize: 34, paddingTop: 0.4 }}
            />
        </Box>
        <Typography textAlign={"center"} variant="h4">
            {quoteState === "create" ? "Create New Quote" : "Edit Quote"}
        </Typography>
        </Box>
        <Typography
            sx={{ display: { md: "block", xs: "none" } }}
            textAlign={"center"}
            variant="h4"
        >
            {quoteState === "create" ? "Create New Quote" : "Edit Quote"}
        </Typography></Box>)
}
export default QuotesHeader;