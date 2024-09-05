import { getContent } from "@/redux/estimateCalculations";
import { getSelectedContentErrorMsgs } from "@/utilities/estimatorHelper";
import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const MissingHardwaresErrorForShowerLayout = () => {
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
        {/** Sliding Door System not available */}
        {hardwareDisable?.slidingDoorSystem && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Sliding Door System:
            </Typography>
            <Typography>
                {hardwareDisable?.slidingDoorSystem?.message}
            </Typography>
        </Box>}
        {/** Header not available */}
        {hardwareDisable?.header && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Header:
            </Typography>
            <Typography>
                {hardwareDisable?.header?.message}
            </Typography>
        </Box>}
        {/** Hardware addons not available */}
        {hardwareDisable?.hardwareAddons && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Hardware Addons:
            </Typography>
            <Typography>
                {hardwareDisable?.hardwareAddons?.message}
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
        {/** Mounting Wall Clamp not available */}
        {hardwareDisable?.wallClamp && selectedContent.mountingState === 'clamps' && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Mounting Wall Clamp:
            </Typography>
            <Typography>
                {hardwareDisable?.wallClamp?.message}
            </Typography>
        </Box>}
        {/** Mounting Sleeve Over not available */}
        {hardwareDisable?.sleeveOver && selectedContent.mountingState === 'clamps' && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Mounting Sleeve Over:
            </Typography>
            <Typography>
                {hardwareDisable?.sleeveOver?.message}
            </Typography>
        </Box>}
        {/** Mounting Glass to Glass not available */}
        {hardwareDisable?.glassToGlass && selectedContent.mountingState === 'clamps' && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Mounting Glass to Glass:
            </Typography>
            <Typography>
                {hardwareDisable?.glassToGlass?.message}
            </Typography>
        </Box>}
        {/** Corner Wall Clamp not available */}
        {hardwareDisable?.cornerWallClamp && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Corner Wall Clamp:
            </Typography>
            <Typography>
                {hardwareDisable?.cornerWallClamp?.message}
            </Typography>
        </Box>}
        {/** Corner Sleeve Over not available */}
        {hardwareDisable?.cornerSleeveOver && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Corner Sleeve Over:
            </Typography>
            <Typography>
                {hardwareDisable?.cornerSleeveOver?.message}
            </Typography>
        </Box>}
        {/** Corner Glass to Glass not available */}
        {hardwareDisable?.cornerGlassToGlass && <Box
            sx={{
                display: "flex",
                textAlign: "baseline",
                gap: 0.6,
            }}
        >
            <Typography sx={{ fontWeight: "bold" }}>
                Corner Glass to Glass:
            </Typography>
            <Typography>
                {hardwareDisable?.cornerGlassToGlass?.message}
            </Typography>
        </Box>}
    </Box>);
}

export default MissingHardwaresErrorForShowerLayout;