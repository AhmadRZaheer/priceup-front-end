import { Edit } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

const CustomerPreview = ({ selectedCustomer, handleStepChange }) => {
    return (<Box sx={{ display: 'flex', gap: 1.5, flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
            <Button sx={{
                width: "fit-content",
                textTransform: "initial",
                backgroundColor: "#8477da",
                "&:hover": {
                    backgroundColor: "#8477da",
                },
                borderRadius: 1,
                padding: 1,
                fontSize: 16,
                height: 35,
            }}
                variant="contained" onClick={() => handleStepChange(0)}><Edit sx={{ fontSize: '18px', marginRight: '5px' }} /> Edit</Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Name :</Typography>
            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>{selectedCustomer?.name}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Email :</Typography>
            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>{selectedCustomer?.email}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Phone Number :</Typography>
            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>{selectedCustomer?.phone}</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ fontSize: '18px', fontWeight: 700 }}>Address :</Typography>
            <Typography sx={{ fontSize: '18px', fontWeight: 500 }}>{selectedCustomer?.address}</Typography>
        </Box>
    </Box>);
};

export default CustomerPreview;