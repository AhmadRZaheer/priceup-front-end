import { getSelectedContent } from "@/redux/mirrorsEstimateSlice";
import { getSelectedContentErrorMsgs } from "@/utilities/mirrorEstimates";
import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const MissingHardwaresErrorForMirrorLayout = () => {
    const selectedContent = useSelector(getSelectedContent);
    const hardwareDisable = useMemo(() => {
        const getErrors = getSelectedContentErrorMsgs(selectedContent);
        return getErrors;
    }, [selectedContent]);
    return (<Box
        sx={{
            display: "flex",
            flexDirection: 'column'
        }}
    >
        {/** Glass type not available */}
        {hardwareDisable?.glassType && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Glass Type:
            </Typography>
            <Typography>
                {hardwareDisable?.glassType?.message}
            </Typography>
        </Box>}
        {/** Edge work not available */}
        {hardwareDisable?.edgeWork && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Edge Work:
            </Typography>
            <Typography>
                {hardwareDisable?.edgeWork?.message}
            </Typography>
        </Box>}
        {/** Glass addons not available */}
        {hardwareDisable?.glassAddons && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Glass Addons:
            </Typography>
            <Typography>
                {hardwareDisable?.glassAddons?.message}
            </Typography>
        </Box>}
        {/** Hardware addons not available */}
        {hardwareDisable?.hardwares && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Hardwares:
            </Typography>
            <Typography>
                {hardwareDisable?.hardwares?.message}
            </Typography>
        </Box>}
    </Box>);
}

export default MissingHardwaresErrorForMirrorLayout;