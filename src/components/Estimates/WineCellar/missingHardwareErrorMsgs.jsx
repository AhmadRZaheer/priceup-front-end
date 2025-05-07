import { getContent } from "@/redux/wineCellarEstimateSlice";
import { getSelectedContentErrorMsgs } from "@/utilities/estimatorHelper";
import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const MissingHardwaresErrorForWineCellarLayout = () => {
    const selectedContent = useSelector(getContent);
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
        {/** Hardware finish not selected */}
        {hardwareDisable?.hardwareFinish && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Hardware Finish:
            </Typography>
            <Typography>
                {hardwareDisable?.hardwareFinish?.message}
            </Typography>
        </Box>}
        {/** Handle not available */}
        {hardwareDisable?.handle && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Handle:
            </Typography>
            <Typography>
                {hardwareDisable?.handle?.message}
            </Typography>
        </Box>}
        {/** Door Lock not available */}
        {hardwareDisable?.doorLock && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Door Lock:
            </Typography>
            <Typography>
                {hardwareDisable?.doorLock?.message}
            </Typography>
        </Box>}
        {/** Hinge not available */}
        {hardwareDisable?.hinge && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Hinge:
            </Typography>
            <Typography>
                {hardwareDisable?.hinge?.message}
            </Typography>
        </Box>}
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
        {/** Mounting Channel not available */}
        {hardwareDisable?.mountingChannel && selectedContent.mountingState === 'channel' && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Mounting Channel:
            </Typography>
            <Typography>
                {hardwareDisable?.mountingChannel?.message}
            </Typography>
        </Box>}
    </Box>);
}

export default MissingHardwaresErrorForWineCellarLayout;