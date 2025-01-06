import { getDecryptedToken } from "@/utilities/common";
import { layoutVariants, userRoles } from "@/utilities/constants";
import { Box, Button, Stack, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import './style.scss';
import { showEditButtonForEstimateStatus } from "@/utilities/estimates";
// import { useSelector } from "react-redux";
// import { getListData } from "@/redux/estimateCalculations";

const renderMeasurements = (layoutId, measurements) => {
    let result = '';
    if (layoutId) {
        result = measurements
            .filter(
                (measurement) => measurement.value !== null && measurement.value !== ""
            )
            .map((measurement) => measurement.value)
            .join("’’/ ");
    } else {
        Object.entries(measurements).forEach(([key, value]) => {
            const { count, width, height } = value;

            // Iterate until the count value of the current element is reached
            for (let i = 1; i <= count; i++) {
                result += `${width}'' / ${height}'' `;
                // Perform any other operations with the current element and count value

                if (i === count) {
                    break; // Exit the loop when the count value is reached
                }
            }
        });
    }
    return result;
}
export const ShowerSummarySection = ({ data, handleEditEstimate }) => {
    const decryptedToken = getDecryptedToken();
    // const showersHardwareList = useSelector(getListData);
    const measurementSides = renderMeasurements(data?.config?.layout_id, data?.config?.measurements ?? []);
    const sqftArea = data.config?.sqftArea;
    const showEditButtonForEstimate = showEditButtonForEstimateStatus(decryptedToken);
    return (
        <Box sx={{ py: 4, pl: 14, pr: '60px' }}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Stack direction="column">
                    <Typography className="twTxt">{measurementSides}</Typography>
                    <Typography className="summaryData" ><Box className='heading-txt'>Layout</Box>&nbsp;: {data?.settings?.name ?? 'Custom'}</Typography>
                    <Typography className="summaryData" ><Box className='heading-txt'>Square Foot</Box>&nbsp;: {sqftArea}</Typography>
                    <Typography className="summaryData"><Box className='heading-txt'>Total Price</Box>&nbsp; : {data.cost?.toFixed(2)}</Typography>
                </Stack>
                {showEditButtonForEstimate ? <Button
                    onClick={handleEditEstimate}
                    variant="contained"
                    startIcon={<EditOutlinedIcon />}
                    className="estimate-btn"
                    sx={{
                        // py: 1,
                        ":hover": {
                            background: "#8477DA",
                        },
                    }}
                >
                    Edit Estimate
                </Button> : ''}
            </Stack>
            <Typography className="summaryTxt" sx={{ py: 1 }}>
                Summary
            </Typography>
            <Stack direction="row" sx={{ flexDirection: "column", gap: "7px" }}>
                {data.resourceInfoWithFullObjects?.hardwareFinishes && <Typography className="summaryData"><Box className='heading-txt'>Finish</Box>&nbsp; : {data.resourceInfoWithFullObjects?.hardwareFinishes?.name}</Typography>}
                {data.resourceInfoWithFullObjects?.handles?.item && <Typography className="summaryData"><Box className='heading-txt'>Handles</Box>&nbsp; : {data.resourceInfoWithFullObjects?.handles?.item?.name} (
                    {data.resourceInfoWithFullObjects?.handles?.count})</Typography>}
                {data.resourceInfoWithFullObjects?.hinges?.item && <Typography className="summaryData"><Box className='heading-txt'>Hinges</Box>&nbsp; : {data.resourceInfoWithFullObjects?.hinges?.item?.name} (
                    {data.resourceInfoWithFullObjects?.hinges?.count})</Typography>}
                    {/* ["channel"].includes(data.config?.mountingState) */}
                {(data.config?.mountingChannel) ? <>{data.resourceInfoWithFullObjects?.mountingChannel && <Typography className="summaryData"><Box className='heading-txt'>Channel</Box>&nbsp; : {data.resourceInfoWithFullObjects?.mountingChannel?.name}</Typography>}</> :
                    <>
                        {data.resourceInfoWithFullObjects?.wallClamp?.length ? <Typography className="summaryData"><Box className='heading-txt'>WallClamps</Box>&nbsp; : {data.resourceInfoWithFullObjects?.wallClamp?.map(
                            (row) => (
                                <span >
                                    {row.item.name} ({row.count}),{" "}
                                </span>
                            )
                        )}</Typography> : ''}
                        {data.resourceInfoWithFullObjects?.sleeveOver?.length ? <Typography className="summaryData"><Box className='heading-txt'>Sleeve Over</Box>&nbsp; : {data.resourceInfoWithFullObjects?.sleeveOver?.map(
                            (row) => (
                                <span >
                                    {row.item.name} ({row.count}),{" "}
                                </span>
                            )
                        )}</Typography> : ''}
                        {data.resourceInfoWithFullObjects?.glassToGlass?.length ? <Typography className="summaryData"><Box className='heading-txt'>Glass To Glass</Box>&nbsp; : {data.resourceInfoWithFullObjects?.glassToGlass?.map(
                            (row) => (
                                <span >
                                    {row.item.name} ({row.count}),{" "}
                                </span>
                            )
                        )}</Typography> : ''}

                    </>
                }
                {data.resourceInfoWithFullObjects?.cornerWallClamp?.length ? <Typography className="summaryData"><Box className='heading-txt'>Corner Wall Clamp</Box>&nbsp; : {data.resourceInfoWithFullObjects?.cornerWallClamp?.map(
                            (row) => (
                                <span >
                                    {row.item.name} ({row.count}),{" "}
                                </span>
                            )
                )}</Typography> : ''}
                {data.resourceInfoWithFullObjects?.cornerSleeveOver?.length ? <Typography className="summaryData"><Box className='heading-txt'>Corner Sleeve Over</Box>&nbsp; : {data.resourceInfoWithFullObjects?.cornerSleeveOver?.map(
                            (row) => (
                                <span >
                                    {row.item.name} ({row.count}),{" "}
                                </span>
                            )
                )}</Typography> : ''}
                {data.resourceInfoWithFullObjects?.cornerGlassToGlass?.length ? <Typography className="summaryData"><Box className='heading-txt'>Corner Glass To Glass</Box>&nbsp; : {data.resourceInfoWithFullObjects?.cornerGlassToGlass?.map(
                            (row) => (
                                <span >
                                    {row.item.name} ({row.count}),{" "}
                                </span>
                            )
                )}</Typography> : ''}
                {data.resourceInfoWithFullObjects?.slidingDoorSystem?.item && <Typography className="summaryData"><Box className='heading-txt'>Sliding Door System</Box>&nbsp; : {data.resourceInfoWithFullObjects?.slidingDoorSystem?.item?.name} (
                    {data.resourceInfoWithFullObjects?.slidingDoorSystem?.count})</Typography>}
                {data.resourceInfoWithFullObjects?.header?.item && <Typography className="summaryData"><Box className='heading-txt'>Header</Box>&nbsp; : {data.resourceInfoWithFullObjects?.header?.item?.name} (
                    {data.resourceInfoWithFullObjects?.header?.count})</Typography>}
                {data.resourceInfoWithFullObjects?.glassType?.item && <Typography className="summaryData"><Box className='heading-txt'>Glass Type</Box>&nbsp; : {data.resourceInfoWithFullObjects?.glassType?.item?.name} (
                    {data.resourceInfoWithFullObjects?.glassType?.thickness})</Typography>}
                {data.resourceInfoWithFullObjects?.glassAddons?.length ? <Typography className="summaryData"><Box className='heading-txt'>Glass Addons</Box>&nbsp;:&nbsp;{data.resourceInfoWithFullObjects?.glassAddons?.map(
                    (row) => (
                        <span >
                            {row.name}{", "}
                        </span>
                    )
                )}</Typography> : ''}
                {data.resourceInfoWithFullObjects?.hardwareAddons?.length ? <Typography className="summaryData"><Box className='heading-txt'>Hardware Addons</Box>&nbsp;:&nbsp;{data.resourceInfoWithFullObjects?.hardwareAddons?.map(
                            (row) => (
                                <span >
                                    {row.item.name} ({row.count}),{" "}
                                </span>
                            )
                )}</Typography> : ''}
                <Typography className="summaryData"><Box className='heading-txt'>People</Box>&nbsp; : {data.config?.people}</Typography>
                <Typography className="summaryData"><Box className='heading-txt'>Hours</Box>&nbsp; : {data.config?.hours}</Typography>
                <Typography className="twTxt" sx={{ py: 1 }}>
                    Additional Fields
                </Typography>
                {data.config?.additionalFields?.map(
                    (item) =>
                        item.label !== "" && (
                            <Typography className="summaryData">{item.label || "---"} : {item.cost}</Typography>
                        )
                )}
            </Stack>
        </Box>

    )
}