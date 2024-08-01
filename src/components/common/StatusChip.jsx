const { statusTypes } = require("@/utilities/constants");
const { Box } = require("@mui/material");

const StatusChip = ({ variant }) => {
    // variants Pending , Voided , Approved
    let bgColorWrapper;
    let colorWrapper;
    let bgColorInner;
    switch (variant) {
        case statusTypes.PENDING:
            bgColorWrapper = "#dfeeff";
            colorWrapper = "#1d85ff";
            bgColorInner = "#1d85ff";
            break;
        case statusTypes.APPROVED:
            bgColorWrapper = "#daf4e9";
            colorWrapper = "#3ac688";
            bgColorInner = "#3ac688";
            break;
        case statusTypes.VOIDED:
            bgColorWrapper = "#f6d8d9";
            colorWrapper = "#d22b2d";
            bgColorInner = "#d22b2d";
            break;
        default:
            bgColorWrapper = 'white';
            colorWrapper = 'black';
            bgColorInner = 'white';
            break;
    }
    return (<Box
        sx={{
            width: "fit-content",
            bgcolor: bgColorWrapper,
            borderRadius: "16px",
            color: colorWrapper,
            pl: 1.8,
            pt: 0.3,
            pr: 1.8,
            pb: 0.5,
            display: "flex",
            gap: 1,
            alignItems: "center",
        }}
    >
        <Box
            sx={{
                width: "6px",
                height: "6px",
                bgcolor: bgColorInner,
                textTransform: 'capitalize',
                borderRadius: "100%",
                mt: 0.2,
            }}
        />
        {variant}
    </Box>)
}

export default StatusChip;