import { getDecryptedToken } from "@/utilities/common"
import { userRoles } from "@/utilities/constants"
import { Box, Button, Stack, Typography } from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import './style.scss';
import { showEditButtonForEstimateStatus } from "@/utilities/estimates";
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
    const showEditButtonForEstimate = showEditButtonForEstimateStatus(decryptedToken);
    return (
        <Box sx={{ py: 4, pl: 14, pr: 3 }}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Stack direction="column">
                    <Typography className="twTxt">{measurementSides}</Typography>
                    <Typography className="summaryData"><Box className='heading-txt'>Square Foot</Box>&nbsp; : {sqftArea}</Typography>
                    <Typography className="summaryData"><Box className='heading-txt'>Total Price</Box>&nbsp; : {data.cost?.toFixed(2)}</Typography>
                </Stack>
                {showEditButtonForEstimate ? <Button
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
                {data.resourceInfoWithFullObjects?.glassType?.item && <Typography className="summaryData"><Box className='heading-txt'>Glass Type</Box>&nbsp; : {data.resourceInfoWithFullObjects?.glassType?.item?.name} (
                    {data.resourceInfoWithFullObjects?.glassType?.thickness})</Typography>}
                {data.resourceInfoWithFullObjects?.edgeWork?.item && <Typography className="summaryData"><Box className='heading-txt'>Edge Work</Box>&nbsp; : {data.resourceInfoWithFullObjects?.edgeWork?.item?.name} (
                    {data.resourceInfoWithFullObjects?.edgeWork?.thickness})</Typography>}
                {data.resourceInfoWithFullObjects?.glassAddons?.length ? <Typography className="summaryData"><Box className='heading-txt'> Glass Addons</Box>&nbsp;: {data.resourceInfoWithFullObjects?.glassAddons?.map((item, index) => (
                    <Typography sx={{fontSize: '17.25px !important', fontWeight: 500,  color: '#344054' }}>{item?.name}{data.resourceInfoWithFullObjects?.glassAddons?.length - 1 !== index ? ', ' : ''}</Typography>
                ))}</Typography> : ''}
                {data.resourceInfoWithFullObjects?.hardwares?.length ? <Typography className="summaryData"><Box className='heading-txt'> Hardwares</Box>&nbsp;: {data.resourceInfoWithFullObjects?.hardwares?.map((item, index) => (
                    <Typography sx={{fontSize: '17.25px !important', fontWeight: 500,  color: '#344054' }}>{item?.name}{data.resourceInfoWithFullObjects?.hardwares?.length - 1 !== index ? ', ' : ''}</Typography>
                ))}</Typography> : ''}
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