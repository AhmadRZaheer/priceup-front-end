import { Box, Typography } from "@mui/material";
import logo from '@/Assets/loadingLogo.png';
import './style.scss';

const SplashScreen = () => {
    return (
        <Box className="splash">
            <img src={logo} className="zoom-in-out" alt="Loading Logo" />
            <Typography sx={{ fontSize: '18px', fontWeight: 700 }} mt={'8px'}>Loading...</Typography>
        </Box>
    );
};

export default SplashScreen;
