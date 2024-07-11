import { getDecryptedToken } from "@/utilities/common"
import { userRoles } from "@/utilities/constants"
import { Box, Button, Stack, Typography } from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import './style.scss';
// import { useSelector } from "react-redux";
// import { getMirrorsHardware } from "@/redux/mirrorsHardwareSlice";
const renderMeasurements = (measurements) => {
    let result = '';

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

    return result;
}

export const MirrorSummarySection = ({ data, handleEditEstimate }) => {
    const decryptedToken = getDecryptedToken();
    // const mirrosHardwareList = useSelector(getMirrorsHardware);
    const measurementSides = renderMeasurements(data?.config?.measurements ?? []);
    const sqftArea = data?.config?.sqftArea ?? 0;

    return (
        <Box sx={{ py: 4, pl: 14, pr: 3 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Stack direction="column">
                    <Typography className="twTxt">{measurementSides}</Typography>
                    <Typography className="summaryData">Square Foot : {sqftArea}</Typography>
                    <Typography className="summaryData">Total Price : {data.cost?.toFixed(2)}</Typography>
                </Stack>
                {decryptedToken?.role !== userRoles.SUPER_ADMIN ? <Button
                    onClick={handleEditEstimate}
                    variant="contained"
                    startIcon={<EditOutlinedIcon />}
                    className="estimatebtn"
                    sx={{
                        py: 1,
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
            <Stack direction="row" sx={{ flexDirection: "column", gap: "4px" }}>
                {data.resourceInfoWithFullObjects?.glassType?.item && <Typography className="summaryData">Glass Type : {data.resourceInfoWithFullObjects?.glassType?.item?.name} (
                    {data.resourceInfoWithFullObjects?.glassType?.thickness})</Typography>}
                {data.resourceInfoWithFullObjects?.edgeWork?.item && <Typography className="summaryData">Edge Work : {data.resourceInfoWithFullObjects?.edgeWork?.item?.name} (
                    {data.resourceInfoWithFullObjects?.edgeWork?.thickness})</Typography>}
                {data.resourceInfoWithFullObjects?.glassAddons?.length ? <Typography className="summaryData"> Glass Addons: {data.resourceInfoWithFullObjects?.glassAddons?.map((item, index) => (
                    <Typography>{item?.name}{data.resourceInfoWithFullObjects?.glassAddons?.length - 1 !== index ? ', ' : ''}</Typography>
                ))}</Typography> : ''}
                {data.resourceInfoWithFullObjects?.hardwares?.length ? <Typography className="summaryData"> Hardwares: {data.resourceInfoWithFullObjects?.hardwares?.map((item, index) => (
                    <Typography>{item?.name}{data.resourceInfoWithFullObjects?.hardwares?.length - 1 !== index ? ', ' : ''}</Typography>
                ))}</Typography> : ''}
                <Typography className="summaryData">People : {data.config?.people}</Typography>
                <Typography className="summaryData">Hours : {data.config?.hours}</Typography>
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