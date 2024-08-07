import { quoteState } from "@/utilities/constants";
import { useSelector } from "react-redux"
import { SimpleLayoutDimensions } from "./Dimensions/simpleLayoutDimensions";
import { CustomLayoutDimensions } from "./Dimensions/customLayoutDimensions";
import { getProjectId, getQuoteState, selectedItem } from "@/redux/estimateCalculations";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export const ShowerDimensions = () => {
    const activeQuoteState = useSelector(getQuoteState);
    const item = useSelector(selectedItem);
    const projectId = useSelector(getProjectId);
    return (<Box>
        <Box
            sx={{
                // width: "100%",
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                background: "white",
                // height: "100vh",
                background: { sm: "white", xs: "#08061B" },
                padding: 2
            }}
        >
            <Box style={{ paddingBottom: "10px" }}>
                <Box
                    sx={{
                        backgroundColor: { xs: "#100D24", sm: "white" },
                        padding: { xs: "10px", sm: "0px" },
                        borderBottomRightRadius: { xs: "16px", sm: "0px" },
                        borderBottomLeftRadius: { xs: "16px", sm: "0px" },
                        display: "flex",
                        alignItems: "center",
                        marginTop: { sm: 0, xs: 5 },
                    }}
                >
                    <NavLink to={activeQuoteState === quoteState.EDIT ? (projectId ? `/projects/${projectId}` : "/estimates") : "/estimates/layouts"}>
                        <Box
                            sx={{
                                display: { xs: "block", sm: "none" },
                                paddingRight: "20px",
                                paddingTop: "4px",
                            }}
                        >
                            {" "}
                            <img src="/icons/left_vector.svg" alt="<" />
                        </Box>
                    </NavLink>

                    <Typography
                        sx={{
                            color: { sm: "black", xs: "white" },
                            fontSize: { xs: "24px", sm: "2.124rem" },
                            textAlign: { xs: "start", sm: "center" },
                            fontWeight: 500,
                        }}
                        variant="h4"
                    >
                        {activeQuoteState === quoteState.EDIT ? 'Edit Estimate' : 'Create New Estimate'}
                    </Typography>
                </Box>
            </Box>
            {activeQuoteState === quoteState.CREATE || (activeQuoteState === quoteState.EDIT && item?.config?.layout_id) ? <SimpleLayoutDimensions /> : activeQuoteState === quoteState.CUSTOM || (activeQuoteState === quoteState.EDIT && !item?.config?.layout_id) ? <CustomLayoutDimensions /> : ''}
        </Box>
        
    </Box>)
}